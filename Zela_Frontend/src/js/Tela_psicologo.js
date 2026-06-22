/* ========================================================
   ZELA - Painel do Psicólogo (Correções Dinâmicas)
   ======================================================== */

/* ---- ESTADO GLOBAL ---- */
const timerSegundos = {};
const timerIntervalos = {};
let historicos = [];    
let pacienteAtivo = null; 
let intervaloConversa = null;

// LENDO OS DADOS DA SESSÃO LOGADA
const idPsicologoLogado = localStorage.getItem('idUsuario');
const nomePsicologo = localStorage.getItem('nomeUsuario') || 'Doutor(a)';

/* ---- UTILITÁRIOS ---- */
function fmt(seg) {
    return String(Math.floor(seg / 60)).padStart(2, '0') + ':' +
           String(seg % 60).padStart(2, '0');
}

function sanitizar(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
    
}
function mascararCPF(cpf) {
    if (!cpf || cpf === 'Não informado' || cpf === 'null') return 'Não informado';
    
    let limpo = cpf.replace(/\D/g, ''); 
    
    if (limpo.length === 11) {
        return `***.***.${limpo.substring(6, 9)}-${limpo.substring(9, 11)}`;
    }
    return '***.***.***-**';
}

/* ---- CONFIGURAÇÃO DE INICIALIZAÇÃO (Exterminando os Fantasmas) ---- */
window.addEventListener('DOMContentLoaded', () => {
    // 1. CORREÇÃO DO NOME DA DOUTORA NO INÍCIO E NO HEADER
    const primeiroNome = nomePsicologo.trim().split(" ")[0];
    const saudacaoEl = document.querySelector('.saudacao');
    if (saudacaoEl) {
        saudacaoEl.textContent = `Olá, Dr(a). ${primeiroNome}`;
    }

    // 2. FORÇANDO A LIMPEZA DO CHAT FALSO NO CARREGAMENTO
    const chatContainer = document.getElementById('chat-mensagens');
    if (chatContainer) {
        chatContainer.innerHTML = '<div style="text-align:center; padding:40px; color:#888;">Nenhum paciente selecionado. Vá em Solicitações e clique em Atender.</div>';
    }

    // 3. LIMPANDO O PAINEL LATERAL DE INFORMAÇÕES
    const elNome = document.getElementById('info-paciente-nome');
    const elCpf = document.getElementById('info-paciente-cpf');
    const elStatus = document.getElementById('info-paciente-status');
    if (elNome) elNome.textContent = "---";
    if (elCpf) elCpf.textContent = "---";
    if (elStatus) elStatus.textContent = "Aguardando";

    // 4. NAVEGAÇÃO INICIAL
    const telaSalva = localStorage.getItem('telaAtual') || 'inicio';
    const link = document.querySelector(`.nav-link[onclick*="${telaSalva}"]`);
    window.trocarTela(telaSalva, link);

    // 5. MÁSCARAS DE CPF E NOME NOS INPUTS
    const inputCpf = document.getElementById('input-cpf');
    const inputPaciente = document.getElementById('input-paciente');

    if (inputCpf) {
        inputCpf.addEventListener('input', function (e) {
            let valor = e.target.value.replace(/\D/g, '');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = valor;
        });
    }

    if (inputPaciente) {
        inputPaciente.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        });
    }
});

/* ---- NAVEGAÇÃO ENTRE TELAS ---- */
window.trocarTela = function(id, linkEl) {
    // Esconde todas as telas
    document.querySelectorAll('.tela-conteudo').forEach(t => {
        t.style.display = 'none';
    });

    const alvo = document.getElementById('secao-' + id);
    if (alvo) {
        alvo.style.display = 'block';
        
        // Chamadas de inicialização de cada tela
        if (id === 'solicitacoes') {
            carregarSolicitacoesDoBanco();
        }
        if (id === 'historicos') {
            carregarHistoricosDoBanco();
        }
        if (id === 'inicio') {
            gerarCalendario();
            atualizarContadoresInicio();
        }
        if (id === 'atendimento') {
            const container = document.getElementById('chat-mensagens');
            // Se entrar no atendimento sem paciente ativo, força a limpeza
            if (!pacienteAtivo && container) {
                container.innerHTML = '<div style="text-align:center; padding:40px; color:#888;">Nenhum paciente selecionado. Vá na aba Solicitações para iniciar.</div>';
                document.getElementById('info-paciente-nome').textContent = "---";
                document.getElementById('info-paciente-cpf').textContent = "---";
                document.getElementById('info-paciente-status').textContent = "Aguardando";
            } else if (pacienteAtivo) {
                window.sincronizarChatAtendimento();
            }
        }
    }

    // Gerencia o botão ativo no menu
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
    });
    if (linkEl) linkEl.classList.add('active');
    
    // Salva a tela atual
    localStorage.setItem('telaAtual', id);

    // Para o pooling do chat se não estiver na tela de atendimento
    if (id !== 'atendimento' && intervaloConversa) {
        clearInterval(intervaloConversa);
        intervaloConversa = null;
    }
};

window.toggleSidebar = function() {
    document.body.classList.toggle('sidebar-hidden');
};

/* ---- BUSCAR SOLICITAÇÕES REAIS NO BANCO (APENAS QUEM MANDOU MENSAGEM) ---- */
async function carregarSolicitacoesDoBanco() {
    const colEsq = document.getElementById('col-esquerda');
    const colDir = document.getElementById('col-direita');
    const elContador = document.getElementById('contagem-espera');
    
    if (!colEsq || !colDir) return;

    colEsq.innerHTML = '<p style="color:#888;">Buscando solicitações...</p>';
    colDir.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:8080/api/usuarios`);
        if (response.ok) {
            const usuarios = await response.json();
            const pacientes = usuarios.filter(u => u.tipoUsuario !== 'psicologo');

            const pacientesQuePediramAjuda = [];

            // Verifica se o paciente mandou mensagem para a doutora
            for (let p of pacientes) {
                try {
                    const resMsg = await fetch(`http://localhost:8080/api/mensagens/conversa/${idPsicologoLogado}/${p.idUsuario}`);
                    if (resMsg.ok) {
                        const msgs = await resMsg.json();
                        if (msgs.length > 0) {
                            pacientesQuePediramAjuda.push(p);
                        }
                    }
                } catch(e) {}
            }

            colEsq.innerHTML = '';

            if(pacientesQuePediramAjuda.length === 0) {
                colEsq.innerHTML = '<p style="color:#888;">Nenhuma solicitação de atendimento no momento.</p>';
                if (elContador) elContador.innerText = "0";
                return;
            }

            if (elContador) elContador.innerText = pacientesQuePediramAjuda.length;

            pacientesQuePediramAjuda.forEach((p, i) => {
                const fotoPadrao = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nome)}&background=965d7f&color=fff`;
                const nomeSafe = p.nome.replace(/'/g, "\\'");
                const cpfDoBanco = p.cpf || 'Não informado';

                const html = `
                    <div class="card-user-zela" id="card-${p.idUsuario}" style="margin-bottom:15px; display:flex; gap:15px; padding:15px; border:1px solid #e0afff; border-radius:12px; background:white;">
                        <div class="foto-frame">
                            <img src="${fotoPadrao}" alt="${sanitizar(p.nome)}" style="width:50px; height:50px; border-radius:50%;">
                        </div>
                        <div class="card-content-zela" style="flex:1;">
                            <div class="user-header-zela" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                <span class="user-name-zela" style="font-weight:bold; color:#2D1A4A;">${sanitizar(p.nome)}</span>
                                <span class="user-timer-zela" id="timer-${p.idUsuario}" style="font-size:0.85rem; color:#888;">
                                    Aguardando resposta...
                                </span>
                            </div>
                            <button class="btn-atender-zela" onclick="window.atender('${p.idUsuario}', '${nomeSafe}', '${cpfDoBanco}')" style="background:#3b1c5f; color:white; border:none; padding:8px 15px; border-radius:6px; cursor:pointer; font-weight:600;">
                                Atender
                            </button>
                        </div>
                    </div>`;

                if (i % 2 === 0) { colEsq.innerHTML += html; } 
                else { colDir.innerHTML += html; }
            });
        }
    } catch(e) { 
        colEsq.innerHTML = '<p style="color:red;">Erro ao buscar solicitações.</p>'; 
    }
}

/* ---- ATENDER PACIENTE REAL ---- */
window.atender = function(id, nome, cpf) {
    // Guarda os dados na memória
    pacienteAtivo = { id: id, name: nome, cpf: cpf };

    const elNome = document.getElementById('info-paciente-nome');
    const elCpf = document.getElementById('info-paciente-cpf');
    const elStatus = document.getElementById('info-paciente-status');
    
    if(elNome) elNome.textContent = nome;
    if(elStatus) elStatus.textContent = "Em Atendimento";
    
    if(elCpf) {
        elCpf.textContent = mascararCPF(cpf);
    }

    setTimeout(() => {
        const linkAtendimento = document.querySelector(`.nav-link[onclick*="atendimento"]`);
        window.trocarTela('atendimento', linkAtendimento);
        window.sincronizarChatAtendimento();
    }, 300);
};

/* ---- CHAT REAL (ENVIAR E BUSCAR HISTÓRICO) ---- */
window.sincronizarChatAtendimento = function() {
    if (!pacienteAtivo) return;

    window.buscarMensagensBanco();
    if(intervaloConversa) clearInterval(intervaloConversa);
    
    intervaloConversa = setInterval(() => {
        window.buscarMensagensBanco();
    }, 3000);
};

window.buscarMensagensBanco = async function() {
    if (!pacienteAtivo || !idPsicologoLogado) return;
    try {
        const response = await fetch(`http://localhost:8080/api/mensagens/conversa/${idPsicologoLogado}/${pacienteAtivo.id}`);
        if (response.ok) {
            const mensagens = await response.json();
            const container = document.getElementById('chat-mensagens');
            if(!container) return;

            container.innerHTML = mensagens.map(msg => {
                if (String(msg.idRemetente) === String(idPsicologoLogado)) {
                    return `
                    <div class="balao-wrapper psicologo-wrapper">
                        <div class="avatar-chat">Dr</div>
                        <div class="balao psicologo-msg" style="word-wrap: break-word;">
                            <small>Você</small>
                            ${sanitizar(msg.conteudo)}
                        </div>
                    </div>`;
                } else {
                    return `
                    <div class="balao-wrapper paciente-wrapper">
                        <div class="avatar-chat">P</div>
                        <div class="balao paciente-msg" style="word-wrap: break-word;">
                            <small>${pacienteAtivo.name.split(" ")[0]}</small>
                            ${sanitizar(msg.conteudo)}
                        </div>
                    </div>`;
                }
            }).join('');
            container.scrollTop = container.scrollHeight;
        }
    } catch(e) { console.error("Erro ao buscar msgs:", e); }
};

window.enviarMensagem = async function () {
    const input = document.getElementById('msgInput');
    if (!input || !pacienteAtivo || input.value.trim() === '') return;

    const payload = {
        idRemetente: parseInt(idPsicologoLogado),
        idDestinatario: parseInt(pacienteAtivo.id),
        conteudo: input.value.trim()
    };
    
    input.value = ''; 

    try {
        const response = await fetch(`http://localhost:8080/api/mensagens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            window.buscarMensagensBanco();
        }
    } catch(e) { console.error("Erro enviar:", e); }
};

/* ---- PRONTUÁRIO E HISTÓRICO INTEGRADO AO JAVA ---- */
window.enviarProntuario = async function () {
    const textarea = document.querySelector('.relatorio-box-prontuario textarea');
    const btn = document.querySelector('.btn-salvar-final');
    const inputPaciente = document.getElementById('input-paciente');
    const inputCpf = document.getElementById('input-cpf');
    const inputNascimento = document.getElementById('input-nascimento');

    if (!textarea || !btn || !inputPaciente || !inputCpf || !inputNascimento) return;

    if (inputPaciente.value.trim() === '') { inputPaciente.classList.add('error'); alert('Preencha o nome do paciente.'); return; }
    inputPaciente.classList.remove('error');

    if (!validarCPF(inputCpf.value)) { inputCpf.classList.add('error'); alert('CPF inválido.'); return; }
    inputCpf.classList.remove('error');

    if (inputNascimento.value.trim() === '') { inputNascimento.classList.add('error'); alert('Preencha a data de nascimento.'); return; }
    inputNascimento.classList.remove('error');

    if (textarea.value.trim() === '') {
        textarea.style.border = '2px solid red';
        setTimeout(() => { textarea.style.border = 'none'; }, 1500);
        return;
    }

    let nascimentoFormatado = '';
    if (inputNascimento.value) {
        const partes = inputNascimento.value.split('-');
        nascimentoFormatado = partes[2] + '/' + partes[1] + '/' + partes[0];
    }

    const payload = {
        idPaciente: pacienteAtivo ? pacienteAtivo.id : 0, 
        idPsicologo: parseInt(idPsicologoLogado),
        dataNascimento: nascimentoFormatado,
        relatorio: textarea.value.trim()
    };

    try {
        const response = await fetch(`http://localhost:8080/api/prontuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            btn.innerText = '✓ Salvo';
            btn.style.background = '#4CAF50';
            btn.disabled = true;

            await carregarHistoricosDoBanco();
            atualizarContadoresInicio(); 

            setTimeout(() => {
                btn.innerText = 'Salvar';
                btn.style.background = '';
                btn.disabled = false;
                inputPaciente.value = '';
                inputCpf.value = '';
                inputNascimento.value = '';
                textarea.value = '';
            }, 1200);
        } else { alert("Erro ao gravar prontuário no banco."); }
    } catch (e) { alert("Erro de conexão ao salvar prontuário."); }
};

async function carregarHistoricosDoBanco() {
    if (!idPsicologoLogado) return;
    try {
        const response = await fetch(`http://localhost:8080/api/prontuarios/psicologo/${idPsicologoLogado}`);
        if (response.ok) {
            historicos = await response.json();
            renderizarListaHistoricos();
        }
    } catch(e) {}
}

function renderizarListaHistoricos() {
    const lista = document.querySelector('.lista-historicos');
    if (!lista) return;

    lista.innerHTML = '';
    if (historicos.length === 0) {
        lista.innerHTML = `<p class="sem-historicos" id="sem-historicos">Nenhum histórico salvo ainda.</p>`;
        return;
    }

    historicos.forEach(h => {
        lista.insertAdjacentHTML('beforeend', `
            <div class="card-historico" style="margin-bottom: 10px; padding: 15px; border: 1px solid #e0afff; border-radius: 8px; background: white;">
                <p><strong>Paciente ID:</strong> ${h.idPaciente}</p>
                <p><strong>Nascimento:</strong> ${h.dataNascimento}</p>
                <button onclick="visualizarHistorico(${h.idProntuario})" style="background: #3b1c5f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px;">
                    Visualizar Relatório
                </button>
            </div>
        `);
    });
}

window.visualizarHistorico = function(id) {
    const item = historicos.find(h => h.idProntuario === id);
    if (!item) return;
    alert(`Relatório do Prontuário:\nData de Nascimento: ${item.dataNascimento}\n\nRelatório:\n${item.relatorio}`);
};

/* ---- ATUALIZAR CONTADORES DO INÍCIO ---- */
async function atualizarContadoresInicio() {
    if (!idPsicologoLogado) return;
    try {
        const resProntuarios = await fetch(`http://localhost:8080/api/prontuarios/psicologo/${idPsicologoLogado}`);
        if (resProntuarios.ok) {
            const lista = await resProntuarios.json();
            const total = lista.length;
            
            const statRows = document.querySelectorAll('.stat-row strong');
            if (statRows.length >= 3) {
                statRows[1].textContent = total < 10 ? `0${total}` : total; 
                statRows[2].textContent = total < 10 ? `0${total}` : total; 
            }
        }
    } catch(e) {}
}

/* ---- CALENDÁRIO ---- */
function gerarCalendario() {
    const wrapper = document.getElementById('calendar-wrapper');
    if (!wrapper) return;

    const d = new Date();
    const mes = d.getMonth();
    const ano = d.getFullYear();
    const hoje = d.getDate();

    const nomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const ini = new Date(ano, mes, 1).getDay();
    const total = new Date(ano, mes + 1, 0).getDate();

    let html = `
        <div class="calendar-container">
            <div class="calendar-header" style="text-align:center; font-weight:bold; color:#2D1A4A; margin-bottom:10px;">${nomes[mes].toUpperCase()} ${ano}</div>
            <div class="calendar-grid" style="display:grid; grid-template-columns: repeat(7, 1fr); gap:5px; text-align:center; font-size:0.85rem;">
                <div class="day-name" style="font-weight:bold; color:#965d7f;">DOM</div>
                <div class="day-name" style="font-weight:bold; color:#965d7f;">SEG</div>
                <div class="day-name" style="font-weight:bold; color:#965d7f;">TER</div>
                <div class="day-name" style="font-weight:bold; color:#965d7f;">QUA</div>
                <div class="day-name" style="font-weight:bold; color:#965d7f;">QUI</div>
                <div class="day-name" style="font-weight:bold; color:#965d7f;">SEX</div>
                <div class="day-name" style="font-weight:bold; color:#965d7f;">SÁB</div>
    `;

    for (let i = 0; i < ini; i++) {
        html += `<div class="day-number empty"></div>`;
    }
    for (let dia = 1; dia <= total; dia++) {
        html += `<div class="day-number ${dia === hoje ? 'today' : ''}" style="${dia === hoje ? 'background:#3b1c5f; color:white; border-radius:50%;' : ''}; padding:5px;">${dia}</div>`;
    }
    html += `</div></div>`;
    wrapper.innerHTML = html;
}

/* ---- FUNÇÃO DE LOGOUT ---- */
window.fazerLogout = function() {
    // 1. Limpa todos os dados da sessão (id, nome, email, tipo)
    localStorage.clear();
    
    // 2. Redireciona para a página de login
    // ATENÇÃO: Troque 'index.html' pelo nome exato do seu arquivo de login, se for diferente!
    window.location.href = '../login.html'; 
};