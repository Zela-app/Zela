// 1. Guardamos os blocos de HTML dentro do JavaScript
const paginas = {
    dashboard: `
        <div class="dashboard-home">
            <h1 class="page-main-title">Dashboard</h1>
            <h2 class="welcome-subtitle">Olá, Maria</h2>
            <div class="cards-grid">
                <div class="zela-card">
                    <h3>Última nota</h3>
                    <span class="card-date">Atualizado em, 03/03/26</span>
                    <p style="color: #333; font-size: 0.95rem; margin-bottom: 20px;">Lorem ipsum dolor sit amet consectetur. Pretium sit tempor consectetur molestie duis. Dis diam consectetur sit morbi.</p>
                    <button class="zela-btn-rose">ir para nota</button>
                </div>
                <div class="zela-card">
                    <h3>Contatos salvos</h3>
                    <span class="card-date">Atualizado em, 03/03/26</span>
                    <div style="margin-bottom: 20px;">
                        <div class="contact-mini-item"><strong>Mãe</strong><span>Telefone: +55 (62) 99999-9999</span></div>
                        <div class="contact-mini-item"><strong>Amiga</strong><span>Telefone: +55 (62) 99999-9999</span></div>
                    </div>
                    <button class="zela-btn-rose">Ir para contatos</button>
                </div>
            </div>
        </div>
    `,
    profile: `
        <h1 class="page-main-title">Perfil do Usuário</h1>
        <div class="zela-card profile-card">
            <div class="profile-banner"></div>
            <div class="profile-header">
                <img src="./assets/img/foto perfil.png" onerror="this.src='https://ui-avatars.com/api/?name=Maria&background=3b1c5f&color=fff'" alt="Maria" class="profile-avatar">
                <div class="profile-info">
                    <h2>Mariana Silva</h2>
                    <span>Usuário desde Janeiro 2026</span>
                </div>
                <button class="zela-btn-rose"><i class="fas fa-pen"></i> Editar Perfil</button>
            </div>
            <div class="profile-stats">
                <div class="stat-box"><h3>3</h3><span>Contatos</span></div>
                <div class="stat-box"><h3>47</h3><span>Check-ins</span></div>
                <div class="stat-box"><h3>1</h3><span>Anotações</span></div>
                <div class="stat-box"><h3>5</h3><span>Conversas</span></div>
            </div>
        </div>
    `,
    emergency: `
        <h1 class="page-main-title">Contatos</h1>
        <div class="zela-card">
            <div class="contacts-header">
                <h2><i class="fas fa-users text-rose"></i> Contatos de Emergência</h2>
                <button class="zela-btn-rose" style="margin: 0;">+ Adicionar Contato</button>
            </div>
            <div class="contact-item">
                <div class="contact-info">
                    <div class="contact-avatar">M</div>
                    <div class="contact-details"><strong>Maria Silva</strong><span>+55 11 98765-4321 • Mãe</span></div>
                </div>
                <div class="contact-actions">
                    <button class="btn-call"><i class="fas fa-phone-alt"></i></button>
                    <button class="btn-delete"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-info">
                    <div class="contact-avatar">A</div>
                    <div class="contact-details"><strong>Ana Santos</strong><span>+55 11 98765-1234 • Amiga</span></div>
                </div>
                <div class="contact-actions">
                    <button class="btn-call"><i class="fas fa-phone-alt"></i></button>
                    <button class="btn-delete"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    `,
    psychologist: `
        <h1 class="page-main-title">Chat Seguro</h1>
        <div class="chat-wrapper">
            <div class="chat-header">
                <div class="contact-avatar" style="background: #965d7f;">Dr</div>
                <div>
                    <strong style="color: #2D1A4A; display: block;">Dr. João Souza</strong>
                    <span style="color: #28a745; font-size: 0.8rem;">Online agora</span>
                </div>
            </div>
            <div class="chat-messages">
                <div class="message-bubble message-received">Olá, Mariana! Sou seu assistente psicológico virtual. Como você está se sentindo hoje?</div>
                <div class="message-bubble message-sent">Oi, Dr. João. Estou me sentindo um pouco ansiosa hoje.</div>
            </div>
            <div class="chat-input-area">
                <input type="text" class="chat-input" placeholder="Converse comigo...">
                <button class="btn-send"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `,
    notes: `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1 class="page-main-title" style="margin: 0;">Anotações</h1>
            <button class="zela-btn-rose" style="margin: 0;"><i class="fas fa-plus"></i> Nova Anotação</button>
        </div>

        <h3 style="color: #2D1A4A; font-size: 1.2rem; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px; margin-bottom: 20px;">Minhas Anotações</h3>

        <div style="display: flex; flex-direction: column; gap: 15px;">
            <div class="zela-card" style="position: relative; padding-right: 60px;">
                <button class="btn-delete" style="position: absolute; right: 20px; top: 20px;"><i class="fas fa-trash-alt"></i></button>
                
                <h3 style="color: #3b1c5f; margin-bottom: 5px; font-size: 1.2rem;">Sessão de Terapia</h3>
                <span class="card-date" style="font-size: 0.8rem; color: #888; display: block; margin-bottom: 15px;">15/10/2026</span>
                
                <p style="color: #555; line-height: 1.5; margin: 0;">
                    Discutimos técnicas de gerenciamento de estresse e como lidar com a ansiedade no trabalho. Combinamos de tentar o exercício de respiração profunda.
                </p>
            </div>

            <div class="zela-card" style="position: relative; padding-right: 60px;">
                <button class="btn-delete" style="position: absolute; right: 20px; top: 20px;"><i class="fas fa-trash-alt"></i></button>
                
                <h3 style="color: #3b1c5f; margin-bottom: 5px; font-size: 1.2rem;">Plano de Segurança</h3>
                <span class="card-date" style="font-size: 0.8rem; color: #888; display: block; margin-bottom: 15px;">10/10/2026</span>
                
                <p style="color: #555; line-height: 1.5; margin: 0;">
                    1. Ligar para a mãe se me sentir ameaçada.<br>
                    2. Ter uma bolsa reserva pronta.<br>
                    3. Usar o botão de pânico do Zela.
                </p>
            </div>
        </div>
    `
};

// 2. Função que escuta os cliques no menu lateral
document.querySelectorAll('.nav-item').forEach(botao => {
    botao.addEventListener('click', function() {
        // Remove a classe 'active' de todos os botões do menu
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        
        // Adiciona 'active' no botão que foi clicado (para ele ficar roxo/rosé)
        this.classList.add('active');
        
        // Pega o nome da página alvo através do atributo 'data-page'
        const paginaAlvo = this.getAttribute('data-page');
        
        // Substitui o conteúdo do meio da tela pelo HTML correspondente
        document.getElementById('pageContent').innerHTML = paginas[paginaAlvo];
    });
});

// Função para abrir/fechar menu lateral no celular (Mobile)
function toggleSidebar(action) {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('mobileOverlay');
    if (action) {
        sidebar.style.transform = 'translateX(0)';
        overlay.style.display = 'block';
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none';
    }
}