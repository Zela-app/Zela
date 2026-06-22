// ========================================================
// 1. LENDO OS DADOS DA USUÁRIA DA "MOCHILA" (LocalStorage)
// ========================================================
let nomeCompleto = localStorage.getItem('nomeUsuario');
let emailUsuario = localStorage.getItem('emailUsuario');
let idUsuarioLogado = localStorage.getItem('idUsuario');

if (!nomeCompleto || nomeCompleto === "undefined" || nomeCompleto === "null") {
    nomeCompleto = "Usuária Convidada";
}
if (!emailUsuario || emailUsuario === "undefined" || emailUsuario === "null") {
    emailUsuario = "Não informado";
}

const partesDoNome = nomeCompleto.trim().split(" ");
const primeiroNome = partesDoNome[0];

window.navegarPara = function(idPagina) {
    const botaoMenu = document.querySelector(`[data-page="${idPagina}"]`);
    if(botaoMenu) botaoMenu.click();
};

// ========================================================
// 2. BLOCOS DE HTML DAS PÁGINAS
// ========================================================
const paginas = {
   
    dashboard: `
        <div class="dashboard-home">
            <h1 class="page-main-title">Dashboard</h1>
            <h2 class="welcome-subtitle">Olá, ${primeiroNome}</h2>
            <div class="cards-grid">
                <div class="zela-card">
                    <h3>Última nota</h3>
                    <span id="dash-nota-data" class="card-date">Carregando...</span>
                    <strong id="dash-nota-titulo" style="color: #2D1A4A; display: block; margin-bottom: 5px; font-size: 1.05rem;"></strong>
                    <p id="dash-nota-conteudo" style="color: #555; font-size: 0.95rem; margin-bottom: 20px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">Buscando suas anotações...</p>
                    <button class="zela-btn-rose" onclick="window.navegarPara('notes')">Ir para notas</button>
                </div>
                <div class="zela-card">
                    <h3>Contatos salvos</h3>
                    <span id="dash-contato-status" class="card-date">Atualizando...</span>
                    <div id="dash-contatos-container" style="margin-bottom: 20px;"></div>
                    <button class="zela-btn-rose" onclick="window.navegarPara('emergency')">Ir para contatos</button>
                </div>
            </div>
        </div>
    `,

    security: `
        <h1 class="page-main-title" style="margin-bottom: 20px;">Central de Segurança</h1>
        
        <div style="background-color: #240d4b; border-radius: 12px; padding: 25px; color: white; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 15px -3px rgba(36, 13, 75, 0.3); flex-wrap: wrap; gap: 20px;">
            <div>
                <h2 style="margin: 0 0 5px 0; display: flex; align-items: center; gap: 10px;">
                    <div style="background: white; color: #240d4b; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-shield-alt"></i></div>
                    Monitoramento Ativo
                </h2>
                <p style="margin: 0; color: #d1d5db; font-size: 0.9rem; margin-left: 50px;">Status do sistema em tempo real</p>
            </div>
            
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.1); padding: 15px 20px; border-radius: 8px; min-width: 110px;">
                    <span style="display: block; font-size: 0.85rem; color: #e0afff; margin-bottom: 5px;"><i class="fas fa-microchip"></i> Sensores</span>
                    <strong style="display: block; font-size: 1.8rem; margin-bottom: 2px;">4/4</strong>
                    <small style="font-size: 0.75rem; opacity: 0.8;">Ativos</small>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px 20px; border-radius: 8px; min-width: 110px;">
                    <span style="display: block; font-size: 0.85rem; color: #e0afff; margin-bottom: 5px;"><i class="fas fa-clock"></i> Check-in</span>
                    <strong id="timer-checkin" style="display: block; font-size: 1.8rem; margin-bottom: 2px;">2d 23h</strong>
                    <small style="font-size: 0.75rem; opacity: 0.8;">Próximo</small>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px 20px; border-radius: 8px; min-width: 110px;">
                    <span style="display: block; font-size: 0.85rem; color: #e0afff; margin-bottom: 5px;"><i class="fas fa-users"></i> Contatos</span>
                    <strong id="monit-contatos-count" style="display: block; font-size: 1.8rem; margin-bottom: 2px;">0</strong>
                    <small style="font-size: 0.75rem; opacity: 0.8;">Emergência</small>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px 20px; border-radius: 8px; min-width: 110px;">
                    <span style="display: block; font-size: 0.85rem; color: #e0afff; margin-bottom: 5px;"><i class="fas fa-map-marker-alt"></i> GPS</span>
                    <strong style="display: block; font-size: 1.8rem; margin-bottom: 2px;">ON</strong>
                    <small style="font-size: 0.75rem; opacity: 0.8;">Localização</small>
                </div>
            </div>
        </div>

        <h3 style="color: #2D1A4A; font-size: 1.2rem; margin-bottom: 15px;"><i class="fas fa-bolt" style="color: #965d7f;"></i> Ações Rápidas</h3>
        <div class="actions-grid" style="margin-bottom: 25px;">
            <button class="action-btn btn-emergency" onclick="window.acionarAlertaEmergencia()"><i class="fas fa-exclamation-triangle"></i><div><strong>Alerta de Emergência</strong></div></button>
            <button class="action-btn btn-silent" onclick="window.acionarAlertaSilencioso()"><i class="fas fa-bell-slash"></i><div><strong>Alerta Silencioso</strong></div></button>
            <button class="action-btn btn-police" onclick="window.ligar190()"><i class="fas fa-phone-alt"></i><div><strong>Ligar 190</strong></div></button>
        </div>

        <div class="sec-grid-split">
            <div class="zela-white-card" style="display: flex; flex-direction: column;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                    <h3 style="color:#2D1A4A; display:flex; align-items:center; gap:10px; font-size:1.2rem; margin:0;"><i class="fas fa-clock" style="color:#3b1c5f;"></i> Check-in de Segurança</h3>
                    <span class="badge-light-green">Ativo</span>
                </div>
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 25px;">Confirme sua segurança a cada 72 horas</p>
                
                <div style="margin-top: auto;">
                    <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:5px;">
                        <span style="color: #555;">Tempo até próximo check-in</span>
                        <strong id="bar-checkin-text" style="color: #2D1A4A;">2d 22h</strong>
                    </div>
                    <div style="background:#f1f1f1; height:8px; border-radius:4px; margin-bottom:20px; overflow: hidden;">
                        <div id="bar-checkin-fill" style="background:#240d4b; width:10%; height:100%; transition: width 1s;"></div>
                    </div>
                    <button onclick="window.confirmarCheckin()" style="width:100%; background:#240d4b; color:white; padding:15px; border-radius:8px; border:none; font-weight:bold; cursor:pointer; font-size: 1rem;"><i class="fas fa-check"></i> Confirmar que Estou Segura</button>
                </div>
            </div>

            <div class="zela-white-card">
                 <h3 style="color:#2D1A4A; display:flex; align-items:center; gap:10px; font-size:1.2rem; margin-top:0; margin-bottom:20px;"><i class="fas fa-robot" style="color:#3b1c5f;"></i> Detecção Automática</h3>
                 
                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f1f1; padding-bottom: 15px; margin-bottom: 15px;">
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <div style="background: #240d4b; color: white; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-bolt"></i></div>
                        <div>
                            <strong style="color: #2D1A4A; display: block;">Movimento Brusco <span class="badge-light-green" style="font-size: 0.6rem; padding: 2px 6px; margin-left: 5px;">Ativo</span></strong>
                            <span style="color: #888; font-size: 0.8rem;">Detecta movimentos súbitos</span>
                        </div>
                    </div>
                    <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                 </div>

                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f1f1; padding-bottom: 15px; margin-bottom: 15px;">
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <div style="background: #240d4b; color: white; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-volume-up"></i></div>
                        <div>
                            <strong style="color: #2D1A4A; display: block;">Sons Altos <span class="badge-light-green" style="font-size: 0.6rem; padding: 2px 6px; margin-left: 5px;">Ativo</span></strong>
                            <span style="color: #888; font-size: 0.8rem;">Identifica gritos ou quebra de vidro</span>
                        </div>
                    </div>
                    <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                 </div>

                 <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <div style="background: #240d4b; color: white; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-arrow-down"></i></div>
                        <div>
                            <strong style="color: #2D1A4A; display: block;">Detector de Queda <span class="badge-light-green" style="font-size: 0.6rem; padding: 2px 6px; margin-left: 5px;">Ativo</span></strong>
                            <span style="color: #888; font-size: 0.8rem;">Quedas bruscas do dispositivo</span>
                        </div>
                    </div>
                    <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                 </div>
            </div>
        </div>

        <h3 style="color: #2D1A4A; font-size: 1.2rem; margin-bottom: 15px;"><i class="fas fa-lightbulb" style="color: #965d7f;"></i> Dicas de Segurança</h3>
        <div class="tips-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 40px;">
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; display: flex; gap: 15px;">
                <div style="color: #166534; font-size: 1.5rem;"><i class="fas fa-battery-full"></i></div>
                <div><strong style="color: #166534; display: block; margin-bottom: 5px;">Celular carregado</strong><span style="color: #15803d; font-size: 0.85rem;">Mantenha bateria suficiente para emergências.</span></div>
            </div>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; display: flex; gap: 15px;">
                <div style="color: #1e3a8a; font-size: 1.5rem;"><i class="fas fa-user-friends"></i></div>
                <div><strong style="color: #1e3a8a; display: block; margin-bottom: 5px;">Contatos de confiança</strong><span style="color: #1d4ed8; font-size: 0.85rem;">Mantenha seus contatos atualizados.</span></div>
            </div>
        </div>
    `,

    profile: `
        <h1 class="page-main-title">Perfil do Usuário</h1>
        
        <div class="zela-card profile-card" style="margin-bottom: 25px;">
            <div class="profile-banner"></div>
            <div class="profile-header">
                <img id="perfil-avatar-grande" src="https://ui-avatars.com/api/?name=${encodeURIComponent(nomeCompleto)}&background=3b1c5f&color=fff" alt="Avatar" class="profile-avatar">
                <div class="profile-info">
                    <h2 id="perfil-nome-titulo">${nomeCompleto}</h2>
                    <span id="perfil-email-subtitulo">${emailUsuario}</span>
                </div>
                <button class="zela-btn-rose" onclick="window.openEditProfileModal()"><i class="fas fa-pen"></i> Editar Perfil</button>
            </div>
            
            <div class="profile-stats">
                <div class="stat-box"><h3 id="stat-contatos">0</h3><span>Contatos</span></div>
                <div class="stat-box"><h3 id="stat-checkins">0</h3><span>Check-ins</span></div>
                <div class="stat-box"><h3 id="stat-anotacoes">0</h3><span>Anotações</span></div>
                <div class="stat-box"><h3 id="stat-conversas">0</h3><span>Conversas</span></div>
            </div>
        </div>

        <div class="zela-card" style="padding: 30px;">
            <h3 style="color: #2D1A4A; font-size: 1.3rem; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                <div style="background: #e0afff; color: #3b1c5f; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-user"></i></div>
                Informações Pessoais
            </h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; border-top: 1px solid #f1f1f1; padding-top: 20px;">
                <div>
                    <strong style="color: #3b1c5f; font-size: 0.9rem; display: block; margin-bottom: 5px;">Nome Completo</strong>
                    <span id="perfil-nome" style="color: #555; font-size: 1rem;">Carregando...</span>
                </div>
                <div>
                    <strong style="color: #3b1c5f; font-size: 0.9rem; display: block; margin-bottom: 5px;">Email</strong>
                    <span id="perfil-email" style="color: #555; font-size: 1rem;">Carregando...</span>
                </div>
                <div>
                    <strong style="color: #3b1c5f; font-size: 0.9rem; display: block; margin-bottom: 5px;">Telefone</strong>
                    <span id="perfil-telefone" style="color: #555; font-size: 1rem;">Carregando...</span>
                </div>
                <div>
                    <strong style="color: #3b1c5f; font-size: 0.9rem; display: block; margin-bottom: 5px;">Data de Nascimento</strong>
                    <span id="perfil-nascimento" style="color: #555; font-size: 1rem;">Não informada</span>
                </div>
            </div>
        </div>
    `,
    
    notes: `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1 class="page-main-title" style="margin: 0;">Anotações</h1>
            <button class="zela-btn-rose" onclick="window.openNoteModal()" style="margin: 0;"><i class="fas fa-plus"></i> Nova Anotação</button>
        </div>
        <h3 style="color: #2D1A4A; font-size: 1.2rem; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px; margin-bottom: 20px;">Minhas Anotações</h3>
        <div id="notes-container" style="display: flex; flex-direction: column; gap: 15px;">
            <p style="color: #888; text-align: center;">Carregando suas anotações...</p>
        </div>
    `,

    emergency: `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1 class="page-main-title" style="margin: 0;">Contatos de emergência</h1>
            <button class="zela-btn-rose" onclick="window.openContactModal()" style="margin: 0; background-color: #965d7f;"><i class="fas fa-plus"></i> Adicionar contato</button>
        </div>
        <div id="contacts-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
            <p style="color: #888; text-align: center; grid-column: 1 / -1;">Carregando seus contatos...</p>
        </div>
    `,

    psychologist: `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1 class="page-main-title" style="margin: 0;">Profissionais de Apoio</h1>
        </div>
        <p style="color: #666; margin-bottom: 25px; font-size: 1rem;">Converse de forma segura e privada com os profissionais cadastrados em nossa rede.</p>
        
        <div id="lista-profissionais-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
            <p style="color: #888; text-align: center; grid-column: 1 / -1;">Buscando profissionais disponíveis...</p>
        </div>
    `
};

// ========================================================
// 3. INICIALIZAÇÃO E NAVEGAÇÃO
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('header-username').textContent = primeiroNome;
    document.getElementById('header-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeCompleto)}&background=3b1c5f&color=fff`;
    window.navegarPara('dashboard');
});

document.querySelectorAll('.nav-item').forEach(botao => {
    botao.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const paginaAlvo = this.getAttribute('data-page');
        if(paginaAlvo && paginas[paginaAlvo]) {
            document.getElementById('pageContent').innerHTML = paginas[paginaAlvo];
        }

        if (paginaAlvo === 'notes') { window.carregarAnotacoes(); } 
        else if (paginaAlvo === 'emergency') { window.carregarContatos(); }
        else if (paginaAlvo === 'profile') { window.carregarPerfil(); }
        else if (paginaAlvo === 'security') { window.carregarMonitoramento(); }
        else if (paginaAlvo === 'psychologist') { window.carregarListaPsicologos(); }
        else if (paginaAlvo === 'dashboard') { window.carregarUltimaNota(); window.carregarUltimosContatos(); }
    });
});

window.toggleSidebar = function(action) {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('mobileOverlay');
    if (action) { sidebar.style.transform = 'translateX(0)'; overlay.style.display = 'block'; } 
    else { sidebar.style.transform = 'translateX(-100%)'; overlay.style.display = 'none'; }
};

// ========================================================
// 4. MÁGICA DO PERFIL (ATUALIZAR DADOS E NÚMEROS)
// ========================================================

window.carregarPerfil = async function() {
    if (!idUsuarioLogado) return;
    
    // 1. Busca os Dados Pessoais (Texto)
    try {
        const res = await fetch(`http://localhost:8080/api/usuarios/${idUsuarioLogado}`);
        if (res.ok) {
            const user = await res.json();
            if(document.getElementById('perfil-nome-titulo')) {
                document.getElementById('perfil-nome-titulo').textContent = user.nome;
                document.getElementById('perfil-email-subtitulo').textContent = user.email;
                document.getElementById('perfil-nome').textContent = user.nome;
                document.getElementById('perfil-email').textContent = user.email;
                document.getElementById('perfil-telefone').textContent = user.telefone || "Não informado";
                document.getElementById('perfil-nascimento').textContent = user.dataNascimento || "Não informada";
                
                localStorage.setItem('nomeUsuario', user.nome);
                localStorage.setItem('emailUsuario', user.email);
                document.getElementById('header-username').textContent = user.nome.split(" ")[0];
                
                const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=3b1c5f&color=fff`;
                document.getElementById('header-avatar').src = newAvatar;
                document.getElementById('perfil-avatar-grande').src = newAvatar;
            }
        }
    } catch(e) { console.error(e); }

    // 2. Busca Anotações e Contatos
    try {
        const resAnotacoes = await fetch(`http://localhost:8080/api/anotacoes/usuario/${idUsuarioLogado}`);
        if (resAnotacoes.ok) {
            const notas = await resAnotacoes.json();
            if(document.getElementById('stat-anotacoes')) document.getElementById('stat-anotacoes').textContent = notas.length;
        }
        
        const resContatos = await fetch(`http://localhost:8080/api/contatos/usuario/${idUsuarioLogado}`);
        if (resContatos.ok) {
            const contatos = await resContatos.json();
            if(document.getElementById('stat-contatos')) document.getElementById('stat-contatos').textContent = contatos.length;
        }
    } catch(e) { console.error(e); }

    // 3. CARREGA O TOTAL DE CHECK-INS
    const checkinsSalvos = localStorage.getItem('checkinsZela') || '0';
    if(document.getElementById('stat-checkins')) {
        document.getElementById('stat-checkins').textContent = checkinsSalvos;
    }

    // 4. MÁGICA DOS DIAS ÚNICOS DE CONVERSA (SET)
    try {
        const resUsuarios = await fetch(`http://localhost:8080/api/usuarios`);
        if (resUsuarios.ok) {
            const todosUsuarios = await resUsuarios.json();
            const psicologos = todosUsuarios.filter(u => u.tipoUsuario === 'psicologo');

            let diasUnicosDeConversa = new Set(); 

            for (let psico of psicologos) {
                try {
                    const resMsg = await fetch(`http://localhost:8080/api/mensagens/conversa/${idUsuarioLogado}/${psico.idUsuario}`);
                    if (resMsg.ok) {
                        const msgs = await resMsg.json();
                        msgs.forEach(msg => {
                            if (msg.dataEnvio) {
                                const dataApenas = msg.dataEnvio.split('T')[0];
                                diasUnicosDeConversa.add(dataApenas); 
                            } else {
                                diasUnicosDeConversa.add("Hoje");
                            }
                        });
                    }
                } catch(e) {}
            }

            if(document.getElementById('stat-conversas')) {
                document.getElementById('stat-conversas').textContent = diasUnicosDeConversa.size;
            }
        }
    } catch(e) { console.error("Erro ao calcular os dias de conversa.", e); }
};

window.openEditProfileModal = function() {
    const modal = document.getElementById('editProfileModal');
    if(!modal) return alert("Erro: Modal de Perfil não encontrado.");
    
    document.getElementById('editProfileName').value = document.getElementById('perfil-nome').textContent;
    document.getElementById('editProfileEmail').value = document.getElementById('perfil-email').textContent;
    
    const tel = document.getElementById('perfil-telefone').textContent;
    document.getElementById('editProfilePhone').value = (tel === "Não informado" || tel === "Carregando...") ? "" : tel;

    modal.style.display = 'flex';
};

window.closeEditProfileModal = function() {
    document.getElementById('editProfileModal').style.display = 'none';
};

window.saveProfile = async function() {
    const nome = document.getElementById('editProfileName').value;
    const email = document.getElementById('editProfileEmail').value;
    const telefone = document.getElementById('editProfilePhone').value;
    const payload = { nome, email, telefone };

    try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${idUsuarioLogado}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if(response.ok) {
            window.closeEditProfileModal();
            window.carregarPerfil(); 
        } else { alert("Erro ao atualizar o perfil."); }
    } catch(e) { alert("Erro de conexão."); }
};

// ========================================================
// 5. MÁGICA DAS ANOTAÇÕES E CONTATOS
// ========================================================

window.carregarUltimaNota = async function() {
    if (!idUsuarioLogado) return;
    try {
        const response = await fetch(`http://localhost:8080/api/anotacoes/usuario/${idUsuarioLogado}`);
        if (response.ok) {
            const notas = await response.json();
            const elData = document.getElementById('dash-nota-data');
            const elTitulo = document.getElementById('dash-nota-titulo');
            const elConteudo = document.getElementById('dash-nota-conteudo');
            if (elData && elTitulo && elConteudo) {
                if (notas.length > 0) {
                    const ultimaNota = notas[0]; 
                    let dataFormatada = "Recentemente";
                    if(ultimaNota.dataCriacao) {
                        const dataObj = new Date(ultimaNota.dataCriacao);
                        dataFormatada = dataObj.toLocaleDateString('pt-BR');
                    }
                    elData.textContent = `Atualizado em ${dataFormatada}`;
                    elTitulo.textContent = ultimaNota.titulo;
                    elConteudo.textContent = ultimaNota.conteudo;
                } else {
                    elData.textContent = "Sem anotações";
                    elTitulo.textContent = "";
                    elConteudo.textContent = "Você ainda não tem nenhuma anotação salva. Acesse a aba Anotações para criar a sua primeira!";
                }
            }
        }
    } catch (e) { console.error("Erro", e); }
};

window.carregarAnotacoes = async function() {
    const container = document.getElementById('notes-container');
    if(!container) return; 
    try {
        const response = await fetch(`http://localhost:8080/api/anotacoes/usuario/${idUsuarioLogado}`);
        if (response.ok) {
            const notas = await response.json();
            window.renderizarNotas(notas);
        }
    } catch (e) { container.innerHTML = '<p style="color:#dc2626;">Erro.</p>'; }
};

window.renderizarNotas = function(notas) {
    const container = document.getElementById('notes-container');
    if (notas.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 40px; background: #fafafa; border-radius: 12px; border: 1px dashed #d1d5db;"><p style="color: #666;">Você ainda não tem nenhuma anotação salva.</p></div>`;
        return;
    }
    container.innerHTML = notas.map(nota => {
        const t = nota.titulo.replace(/'/g, "\\'");
        const c = nota.conteudo ? nota.conteudo.replace(/'/g, "\\'") : "";
        return `
        <div class="zela-card" style="position: relative; padding-right: 60px;">
            <div style="position: absolute; right: 15px; top: 15px; display: flex; gap: 15px;">
                <button onclick="window.openNoteModal('${nota.idAnotacao}', '${t}', '${c}')" style="background: none; border: none; color: #965d7f; cursor: pointer; font-size: 1.1rem;"><i class="fas fa-pen"></i></button>
                <button onclick="window.confirmarDeletarNota('${nota.idAnotacao}', '${t}')" style="background: none; border: none; color: #dc2626; cursor: pointer; font-size: 1.1rem;"><i class="fas fa-trash-alt"></i></button>
            </div>
            <h3 style="color: #3b1c5f; margin-top: 0; margin-bottom: 5px; font-size: 1.2rem;">${nota.titulo}</h3>
            <p style="color: #555; line-height: 1.6; margin-top: 15px; font-size: 0.95rem;">${nota.conteudo}</p>
        </div>`;
    }).join('');
};

window.openNoteModal = function(id = '', titulo = '', conteudo = '') {
    const modal = document.getElementById('noteModal');
    if (!modal) return;
    document.getElementById('noteId').value = id;
    document.getElementById('noteTitle').value = titulo;
    document.getElementById('noteContent').value = conteudo;
    const modalTitle = document.getElementById('noteModalTitle');
    if(modalTitle) modalTitle.innerHTML = id ? '<i class="fas fa-pen"></i> Editar' : '<i class="fas fa-file-alt"></i> Nova';
    modal.style.display = 'flex';
};

window.closeNoteModal = function() { document.getElementById('noteModal').style.display = 'none'; };

window.saveNote = async function() {
    const id = document.getElementById('noteId').value;
    const payload = { titulo: document.getElementById('noteTitle').value, conteudo: document.getElementById('noteContent').value, idUsuario: idUsuarioLogado };
    const url = id ? `http://localhost:8080/api/anotacoes/${id}` : `http://localhost:8080/api/anotacoes`;
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    window.closeNoteModal(); window.carregarAnotacoes();
};

window.notaParaDeletarId = null;
window.confirmarDeletarNota = function(id, titulo) {
    window.notaParaDeletarId = id;
    document.getElementById('noteToDeleteTitle').textContent = titulo;
    document.getElementById('deleteNoteModal').style.display = 'flex';
};
window.closeDeleteNoteModal = function() { document.getElementById('deleteNoteModal').style.display = 'none'; };
window.deleteNoteFromModal = async function() {
    await fetch(`http://localhost:8080/api/anotacoes/${window.notaParaDeletarId}`, { method: 'DELETE' });
    window.closeDeleteNoteModal(); window.carregarAnotacoes();
};

window.carregarUltimosContatos = async function() {
    if (!idUsuarioLogado) return;
    try {
        const response = await fetch(`http://localhost:8080/api/contatos/usuario/${idUsuarioLogado}`);
        if (response.ok) {
            const contatos = await response.json();
            const elStatus = document.getElementById('dash-contato-status');
            const elContainer = document.getElementById('dash-contatos-container');
            if (elStatus && elContainer) {
                if (contatos.length > 0) {
                    elStatus.textContent = "Sincronizado";
                    elContainer.innerHTML = contatos.slice(0, 2).map(c => `<div class="contact-mini-item"><strong>${c.nome}</strong><span>Telefone: ${c.telefone}</span></div>`).join('');
                } else {
                    elStatus.textContent = "Nenhum contato";
                    elContainer.innerHTML = `<p style="color:#555; font-size:0.9rem;">Adicione contatos.</p>`;
                }
            }
        }
    } catch (e) {}
};

window.carregarContatos = async function() {
    const container = document.getElementById('contacts-container');
    if(!container) return; 
    try {
        const response = await fetch(`http://localhost:8080/api/contatos/usuario/${idUsuarioLogado}`);
        if (response.ok) {
            const contatos = await response.json();
            window.renderizarContatos(contatos);
        }
    } catch (e) {}
};

window.renderizarContatos = function(contatos) {
    const container = document.getElementById('contacts-container');
    if (contatos.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px;"><p>Nenhum contato salvo.</p></div>`;
        return;
    }
    container.innerHTML = contatos.map(c => {
        const nomeSafe = c.nome.replace(/'/g, "\\'");
        const telSafe = c.telefone.replace(/'/g, "\\'");
        const locSafe = c.localizacao ? c.localizacao.replace(/'/g, "\\'") : "";
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.nome)}&background=965d7f&color=fff`;

        return `
        <div class="zela-card" style="padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f1f1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #2D1A4A; font-size: 1.3rem; margin: 0;">${c.nome}</h3>
                <img src="${avatarUrl}" style="width: 50px; height: 50px; border-radius: 50%;">
            </div>
            <div style="border: 1px solid #e0afff; border-radius: 6px; padding: 10px; margin-bottom: 10px; background: #fdfcff;">
                <strong style="color: #3b1c5f; font-size: 0.85rem; display: block; margin-bottom: 2px;">Número</strong>
                <span style="color: #333; font-size: 0.95rem;">${c.telefone}</span>
            </div>
            <div style="border: 1px solid #e0afff; border-radius: 6px; padding: 10px; margin-bottom: 20px; background: #fdfcff;">
                <strong style="color: #3b1c5f; font-size: 0.85rem; display: block; margin-bottom: 2px;">Localização</strong>
                <span style="color: #333; font-size: 0.95rem;">${c.localizacao || "Não informada"}</span>
            </div>
            <div style="display: flex; gap: 10px; margin-top: auto;">
                <button onclick="window.openContactModal('${c.idContato}', '${nomeSafe}', '${telSafe}', '${locSafe}')" style="flex: 1; background: #965d7f; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">Editar</button>
                <button onclick="window.confirmarDeletarContato('${c.idContato}', '${nomeSafe}')" style="flex: 1; background: transparent; color: #dc2626; border: 1px solid #dc2626; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">Excluir</button>
            </div>
        </div>`;
    }).join('');
};

window.openContactModal = function(id = '', nome = '', telefone = '', localizacao = '') {
    document.getElementById('contactId').value = id;
    document.getElementById('contactName').value = nome;
    document.getElementById('contactPhone').value = telefone;
    document.getElementById('contactLocation').value = localizacao;
    const title = document.getElementById('contactModalTitle');
    if(title) title.innerHTML = id ? '<i class="fas fa-user-edit"></i> Editar Contato' : '<i class="fas fa-user-plus"></i> Novo Contato';
    document.getElementById('contactModal').style.display = 'flex';
};
window.closeContactModal = function() { document.getElementById('contactModal').style.display = 'none'; };

window.saveContact = async function() {
    const id = document.getElementById('contactId').value;
    const payload = { nome: document.getElementById('contactName').value, telefone: document.getElementById('contactPhone').value, localizacao: document.getElementById('contactLocation').value, idUsuario: idUsuarioLogado };
    const url = id ? `http://localhost:8080/api/contatos/${id}` : `http://localhost:8080/api/contatos`;
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    window.closeContactModal(); window.carregarContatos();
};

window.contatoParaDeletarId = null;
window.confirmarDeletarContato = function(id, nome) {
    window.contatoParaDeletarId = id;
    document.getElementById('contactToDeleteName').textContent = nome;
    document.getElementById('deleteContactModal').style.display = 'flex';
};
window.closeDeleteContactModal = function() { document.getElementById('deleteContactModal').style.display = 'none'; };
window.deleteContactFromModal = async function() {
    await fetch(`http://localhost:8080/api/contatos/${window.contatoParaDeletarId}`, { method: 'DELETE' });
    window.closeDeleteContactModal(); window.carregarContatos();
};

// ========================================================
// 6. FUNÇÕES DA CENTRAL DE SEGURANÇA E SOS
// ========================================================

window.carregarMonitoramento = async function() {
    if (!idUsuarioLogado) return;
    try {
        const resContatos = await fetch(`http://localhost:8080/api/contatos/usuario/${idUsuarioLogado}`);
        if (resContatos.ok) {
            const contatos = await resContatos.json();
            const countEl = document.getElementById('monit-contatos-count');
            if (countEl) countEl.textContent = contatos.length;
        }
    } catch(e) { console.error("Erro ao buscar contatos para monitoramento."); }
};

window.acionarAlertaEmergencia = function() {
    alert("🚨 ALERTA DE EMERGÊNCIA!\n\nNotificando seus contatos de emergência e iniciando gravação de áudio oculta no dispositivo.");
};

window.acionarAlertaSilencioso = function() {
    alert("🤫 ALERTA SILENCIOSO ATIVADO\n\nMonitoramento intensificado. Nenhum som ou notificação visual será emitido pelo celular.");
};

window.ligar190 = function() {
    if(confirm("Deseja iniciar uma chamada para a Polícia Militar (190) agora?")) {
        window.location.href = "tel:190"; 
    }
};

// --- MÁGICA DO CHECK-IN ---
window.confirmarCheckin = function() {
    const fill = document.getElementById('bar-checkin-fill');
    const timer1 = document.getElementById('timer-checkin');
    const timer2 = document.getElementById('bar-checkin-text');
    
    if(fill) fill.style.width = "0%";
    if(timer1) timer1.textContent = "72h 00m";
    if(timer2) timer2.textContent = "72h 00m";
    
    // Conta os Check-ins e atualiza o Perfil
    let totalCheckins = parseInt(localStorage.getItem('checkinsZela') || '0');
    totalCheckins++; 
    localStorage.setItem('checkinsZela', totalCheckins); 
    
    const elStatCheckin = document.getElementById('stat-checkins');
    if (elStatCheckin) elStatCheckin.textContent = totalCheckins;

    alert("✅ Check-in realizado com sucesso!\n\nSeu próximo check-in de segurança é daqui a 72 horas.");
};

window.abrirModalSOS = function() {
    const modal = document.getElementById('sosModal');
    if(modal) modal.style.display = 'flex';
};

window.cancelarSOS = function() {
    const modal = document.getElementById('sosModal');
    if(modal) modal.style.display = 'none';
};

// ========================================================
// 7. MÁGICA DO CHAT REAL (LISTA, MENSAGENS E POLLING)
// ========================================================

window.carregarListaPsicologos = async function() {
    const container = document.getElementById('lista-profissionais-container');
    if (!container) return;

    try {
        const response = await fetch(`http://localhost:8080/api/usuarios`);
        if (response.ok) {
            const todosUsuarios = await response.json();
            const psicologos = todosUsuarios.filter(u => u.tipoUsuario === 'psicologo');

            if (psicologos.length === 0) {
                container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px;"><p style="color: #666;">Nenhum profissional disponível no momento.</p></div>`;
                return;
            }

            container.innerHTML = psicologos.map(psico => {
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(psico.nome)}&background=e0afff&color=240d4b`;
                const nomeSafe = psico.nome.replace(/'/g, "\\'");
                
                return `
                <div class="zela-card" style="padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f1f1; display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <img src="${avatarUrl}" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h3 style="color: #2D1A4A; font-size: 1.2rem; margin: 0 0 5px 0;">${psico.nome}</h3>
                    <span style="color: #888; font-size: 0.85rem; margin-bottom: 20px;">Psicólogo(a) Especialista</span>
                    <button onclick="window.abrirChatReal('${psico.idUsuario}', '${nomeSafe}')" style="width: 100%; background: #3b1c5f; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s;"><i class="fas fa-comment-dots"></i> Iniciar Conversa</button>
                </div>`;
            }).join('');
        }
    } catch (e) {
        container.innerHTML = '<p style="color:#dc2626; text-align:center; grid-column:1/-1;">Erro ao carregar os profissionais.</p>';
    }
};

let intervaloChat = null; 

window.abrirChatReal = function(idProfissional, nomeProfissional) {
    const modal = document.getElementById('chatModal');
    if (!modal) return;

    document.getElementById('chatProfId').value = idProfissional;
    document.getElementById('chatProfNome').textContent = nomeProfissional;
    document.getElementById('chatProfAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeProfissional)}&background=e0afff&color=240d4b`;
    document.getElementById('chatMessagesArea').innerHTML = '<p style="text-align: center; color: #888; font-size: 0.9rem;">Carregando histórico...</p>';
    
    modal.style.display = 'flex';

    window.buscarHistoricoMensagens(idProfissional);

    if (intervaloChat) clearInterval(intervaloChat);
    intervaloChat = setInterval(() => {
        window.buscarHistoricoMensagens(idProfissional);
    }, 3000);
};

window.fecharChatModal = function() {
    const modal = document.getElementById('chatModal');
    if(modal) modal.style.display = 'none';
    if (intervaloChat) {
        clearInterval(intervaloChat);
        intervaloChat = null;
    }
};

window.buscarHistoricoMensagens = async function(idOutraPessoa) {
    if (!idUsuarioLogado) return;
    
    try {
        const response = await fetch(`http://localhost:8080/api/mensagens/conversa/${idUsuarioLogado}/${idOutraPessoa}`);
        if (response.ok) {
            const mensagens = await response.json();
            const container = document.getElementById('chatMessagesArea');
            
            if (mensagens.length === 0) {
                container.innerHTML = `<p style="text-align: center; color: #888; font-size: 0.9rem; margin-top: 40px;">Esta é uma conversa segura. Envie a primeira mensagem.</p>`;
                return;
            }

            container.innerHTML = mensagens.map(msg => {
                if (String(msg.idRemetente) === String(idUsuarioLogado)) {
                    return `
                    <div style="display: flex; gap: 10px; align-items: flex-end; align-self: flex-end;">
                        <div style="background: #965d7f; color: white; padding: 12px 18px; border-radius: 15px; border-bottom-right-radius: 2px; max-width: 250px; font-size: 0.95rem; line-height: 1.4; box-shadow: 0 2px 5px rgba(0,0,0,0.1); word-wrap: break-word;">
                            ${msg.conteudo}
                        </div>
                    </div>`;
                } else {
                    return `
                    <div style="display: flex; gap: 10px; align-items: flex-end; align-self: flex-start;">
                        <div style="background: #ffffff; border: 1px solid #e0afff; color: #2D1A4A; padding: 12px 18px; border-radius: 15px; border-bottom-left-radius: 2px; max-width: 250px; font-size: 0.95rem; line-height: 1.4; box-shadow: 0 2px 5px rgba(0,0,0,0.05); word-wrap: break-word;">
                            ${msg.conteudo}
                        </div>
                    </div>`;
                }
            }).join('');

            container.scrollTop = container.scrollHeight;
        }
    } catch (e) { console.error("Erro ao buscar chat", e); }
};

window.enviarMensagemReal = async function() {
    const inputField = document.getElementById('chatInputMessage');
    const conteudo = inputField.value.trim();
    const idDestinatario = document.getElementById('chatProfId').value;
    
    if (!conteudo || !idDestinatario || !idUsuarioLogado) return;

    const payload = {
        idRemetente: parseInt(idUsuarioLogado),
        idDestinatario: parseInt(idDestinatario),
        conteudo: conteudo
    };

    inputField.value = ''; 

    try {
        const response = await fetch(`http://localhost:8080/api/mensagens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            window.buscarHistoricoMensagens(idDestinatario);
        }
    } catch (e) { alert("Erro ao enviar mensagem."); }
};

// --- LOGOUT CORRIGIDO PARA SAIR DA PASTA SRC ---
window.fazerLogout = function() {
    localStorage.clear();
    window.location.href = '../login.html'; 
};