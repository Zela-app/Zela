/* ==========================================
   ZELA - Dashboard
   script.js
   ========================================== */

/* ---- ESTADO GLOBAL ---- */
const timerSegundos = {};
const timerIntervalos = {};

const solicitacoes = [
    { id: 1, nome: 'Maria Oliveira', foto: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, nome: 'Ana Costa', foto: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, nome: 'Juliana Santos', foto: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, nome: 'Fernanda Lima', foto: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

const historicos = [];

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

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
}

/* ---- PRONTUÁRIO ---- */
window.enviarProntuario = function () {
    const textarea = document.querySelector('.relatorio-box-prontuario textarea');
    const lista = document.querySelector('.lista-historicos');
    const btn = document.querySelector('.btn-salvar-final');

    const inputPaciente = document.getElementById('input-paciente');
    const inputCpf = document.getElementById('input-cpf');
    const inputNascimento = document.getElementById('input-nascimento');

    if (!textarea || !lista || !btn || !inputPaciente || !inputCpf || !inputNascimento) return;

    if (inputPaciente.value.trim() === '') {
        inputPaciente.classList.add('error');
        alert('Preencha o nome do paciente.');
        return;
    }

    inputPaciente.classList.remove('error');

    if (!validarCPF(inputCpf.value)) {
        inputCpf.classList.add('error');
        alert('CPF inválido.');
        return;
    }

    inputCpf.classList.remove('error');

    if (inputNascimento.value.trim() === '') {
        inputNascimento.classList.add('error');
        alert('Preencha a data de nascimento.');
        return;
    }

    inputNascimento.classList.remove('error');

    if (textarea.value.trim() === '') {
        textarea.style.border = '2px solid red';

        setTimeout(() => {
            textarea.style.border = 'none';
        }, 1500);

        return;
    }

    let nascimentoFormatado = '';

    if (inputNascimento.value) {
        const partes = inputNascimento.value.split('-');
        nascimentoFormatado = partes[2] + '/' + partes[1] + '/' + partes[0];
    }

    const prontuario = {
        id: Date.now(),
        paciente: inputPaciente.value.trim(),
        cpf: inputCpf.value.trim(),
        nascimento: nascimentoFormatado,
        relatorio: textarea.value.trim()
    };

    historicos.unshift(prontuario);

    const mensagemVazia = document.getElementById('sem-historicos');

    if (mensagemVazia) {
        mensagemVazia.remove();
    }

    lista.insertAdjacentHTML('afterbegin', `
        <div class="card-historico">
            <p><strong>Paciente:</strong> ${sanitizar(prontuario.paciente)}</p>
            <p><strong>CPF:</strong> ${sanitizar(prontuario.cpf)}</p>

            <button onclick="visualizarHistorico(${prontuario.id})">
                visualizar
            </button>
        </div>
    `);

    btn.innerText = '✓ Salvo';
    btn.style.background = '#4CAF50';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = 'Salvar';
        btn.style.background = '';
        btn.disabled = false;

        inputPaciente.value = '';
        inputCpf.value = '';
        inputNascimento.value = '';
        textarea.value = '';
    }, 1200);
};

/* ---- VISUALIZAR HISTÓRICO ---- */
function visualizarHistorico(id) {
    const item = historicos.find(h => h.id === id);
    if (!item) return;

    alert(
`Paciente: ${item.paciente}
CPF: ${item.cpf}
Nascimento: ${item.nascimento}

Relatório:
${item.relatorio}`
    );
}

/* ---- NAVEGAÇÃO ---- */
function trocarTela(id, linkEl) {
    document.querySelectorAll('.tela-conteudo').forEach(t => {
        t.style.display = 'none';
    });

    const alvo = document.getElementById('secao-' + id);

    if (alvo) {
        alvo.style.display = 'block';

        if (id === 'solicitacoes') renderizarSolicitacoes();

        if (id === 'inicio') {
            gerarCalendario();
            atualizarContador();
        }
    }

    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
    });

    if (linkEl) linkEl.classList.add('active');

    localStorage.setItem('telaAtual', id);
}

function toggleSidebar() {
    document.body.classList.toggle('sidebar-hidden');
}

/* ---- TIMERS ---- */
function iniciarTimerEspera(id) {
    if (timerSegundos[id] === undefined) timerSegundos[id] = 0;
    if (timerIntervalos[id]) return;

    timerIntervalos[id] = setInterval(() => {
        timerSegundos[id]++;

        const el = document.getElementById('timer-' + id);

        if (el) {
            el.textContent = 'tempo de espera: ' + fmt(timerSegundos[id]);
        }
    }, 1000);
}

/* ---- ATENDER ---- */
function atender(id) {
    const btn = document.querySelector(`#card-${id} .btn-atender-zela`);

    if (btn) {
        btn.innerText = '✓ Em atendimento';
        btn.style.background = '#4CAF50';
        btn.disabled = true;
    }
}

/* ---- ENVIAR MENSAGEM ---- */
window.enviarMensagem = function () {
    const input = document.getElementById('msgInput');
    const container = document.getElementById('chat-mensagens');

    if (!input || !container || input.value.trim() === '') return;

    const novoBalao = `
        <div class="balao-wrapper psicologo-wrapper">
            <div class="avatar-chat">Dr</div>
            <div class="balao psicologo-msg">
                <small>Psicóloga</small>
                ${sanitizar(input.value)}
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', novoBalao);
    input.value = '';
    container.scrollTop = container.scrollHeight;
};

/* ---- CONTADOR ---- */
function atualizarContador() {
    const el = document.getElementById('contagem-espera');

    if (el) {
        el.innerText = solicitacoes.length;
    }
}

/* ---- RENDERIZAR SOLICITAÇÕES ---- */
function renderizarSolicitacoes() {
    const colEsq = document.getElementById('col-esquerda');
    const colDir = document.getElementById('col-direita');

    if (!colEsq || !colDir) return;

    colEsq.innerHTML = '';
    colDir.innerHTML = '';

    solicitacoes.forEach((p, i) => {
        const html = `
            <div class="card-user-zela" id="card-${p.id}">
                <div class="foto-frame">
                    <img src="${p.foto}" alt="${sanitizar(p.nome)}"
                         onerror="this.style.display='none'">
                </div>

                <div class="card-content-zela">
                    <div class="user-header-zela">
                        <span class="user-name-zela">${sanitizar(p.nome)}</span>
                        <span class="user-timer-zela" id="timer-${p.id}">
                            tempo de espera: 00:00
                        </span>
                    </div>

                    <button class="btn-atender-zela" onclick="atender(${p.id})">
                        Atender
                    </button>
                </div>
            </div>
        `;

        if (i < 2) {
            colEsq.innerHTML += html;
        } else {
            colDir.innerHTML += html;
        }
    });

    solicitacoes.forEach(p => iniciarTimerEspera(p.id));
}

/* ---- CALENDÁRIO ---- */
function gerarCalendario() {
    const wrapper = document.getElementById('calendar-wrapper');
    if (!wrapper) return;

    const d = new Date();
    const mes = d.getMonth();
    const ano = d.getFullYear();
    const hoje = d.getDate();

    const nomes = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const ini = new Date(ano, mes, 1).getDay();
    const total = new Date(ano, mes + 1, 0).getDate();

    let html = `
        <div class="calendar-container">
            <div class="calendar-header">${nomes[mes].toUpperCase()} ${ano}</div>
            <div class="calendar-grid">
                <div class="day-name">DOM</div>
                <div class="day-name">SEG</div>
                <div class="day-name">TER</div>
                <div class="day-name">QUA</div>
                <div class="day-name">QUI</div>
                <div class="day-name">SEX</div>
                <div class="day-name">SÁB</div>
    `;

    for (let i = 0; i < ini; i++) {
        html += `<div class="day-number empty"></div>`;
    }

    for (let dia = 1; dia <= total; dia++) {
        html += `
            <div class="day-number ${dia === hoje ? 'today' : ''}">
                ${dia}
            </div>
        `;
    }

    html += `
            </div>
        </div>
    `;

    wrapper.innerHTML = html;
}

/* ---- INIT ---- */
window.onload = () => {
    const telaSalva = localStorage.getItem('telaAtual') || 'inicio';
    const link = document.querySelector(`.nav-link[onclick*="${telaSalva}"]`);

    trocarTela(telaSalva, link);

    const inputCpf = document.getElementById('input-cpf');
    const inputPaciente = document.getElementById('input-paciente');

    if (inputCpf) {
        inputCpf.addEventListener('input', function (e) {
            let valor = e.target.value;

            valor = valor.replace(/\D/g, '');
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
};