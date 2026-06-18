// 1. Guardamos os blocos de HTML dentro do JavaScript
const paginas = {
   
    // === 1. TELA DA DASHBOARD (Apenas os cartões brancos) ===
    dashboard: `
        <div class="dashboard-home">
            <h1 class="page-main-title">Dashboard</h1>
            <h2 class="welcome-subtitle">Olá, Maria</h2>
            
            <div class="cards-grid">
                <div class="zela-card">
                    <h3>Última nota</h3>
                    <span class="card-date">Atualizado em, 03/03/26</span>
                    <p style="color: #333; font-size: 0.95rem; margin-bottom: 20px;">
                        Lorem ipsum dolor sit amet consectetur. Pretium sit tempor consectetur molestie duis. 
                        Dis diam consectetur sit morbi.
                    </p>
                    <button class="zela-btn-rose">ir para nota</button>
                </div>
                
                <div class="zela-card">
                    <h3>Contatos salvos</h3>
                    <span class="card-date">Atualizado em, 03/03/26</span>
                    <div style="margin-bottom: 20px;">
                        <div class="contact-mini-item">
                            <strong>Mãe</strong>
                            <span>Telefone: +55 (62) 99999-9999</span>
                        </div>
                        <div class="contact-mini-item">
                            <strong>Amiga</strong>
                            <span>Telefone: +55 (62) 99999-9999</span>
                        </div>
                    </div>
                    <button class="zela-btn-rose">Ir para contatos</button>
                </div>
            </div>
        </div>
    `,

    // === 2. TELA DA CENTRAL DE SEGURANÇA (Os cartões roxos com SOS) ===
    security: `
        <h1 class="page-main-title" style="margin-bottom: 25px;">Central de Segurança</h1>

        <div class="security-section">
            <div class="security-header">
                <h3><i class="fas fa-bolt" style="color: #e0afff;"></i> Ações Rápidas</h3>
                <span class="badge-green"><i class="fas fa-location-arrow"></i> Localização Ativa</span>
            </div>
            <div class="actions-grid">
                <button class="action-btn btn-emergency">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Alerta de Emergência</strong>
                        <span>Notifica contatos e grava áudio</span>
                    </div>
                </button>
                <button class="action-btn btn-silent">
                    <i class="fas fa-bell-slash"></i>
                    <div>
                        <strong>Alerta Silencioso</strong>
                        <span>Monitora sem notificar agressor</span>
                    </div>
                </button>
                <button class="action-btn btn-police">
                    <i class="fas fa-phone-alt"></i>
                    <div>
                        <strong>Ligar 190</strong>
                        <span>Polícia Militar</span>
                    </div>
                </button>
            </div>
        </div>

        <div class="sec-grid-split">
            
            <div class="zela-white-card" style="display: flex; flex-direction: column;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 15px;">
                    <h3 style="color:#2D1A4A; display:flex; align-items:center; gap:10px; font-size:1.2rem; margin:0;">
                        <i class="fas fa-clock" style="color:#3b1c5f;"></i> Check-in de Segurança
                    </h3>
                    <span class="badge-light-green">Ativo</span>
                </div>
                <p style="color:#555; font-size:0.9rem; margin-bottom:30px;">Confirme sua segurança a cada 72 horas</p>
                
                <div style="margin-top: auto;"> <div style="display:flex; justify-content:space-between; font-size:0.9rem; color:#555; margin-bottom:5px;">
                        <span>Tempo até próximo check-in</span>
                        <strong style="color:#2D1A4A; font-size:1.1rem;">2d 22h</strong>
                    </div>
                    <div style="background:#e0afff; height:6px; border-radius:3px; margin-bottom:25px; position:relative;">
                        <div style="background:#240d4b; width:15%; height:100%; border-radius:3px;"></div>
                    </div>
                    <button style="width:100%; background:#240d4b; color:white; padding:15px; border-radius:8px; border:none; font-weight:bold; cursor:pointer; display:flex; justify-content:center; gap:10px; transition:0.3s;" onmouseover="this.style.background='#3b1c5f'" onmouseout="this.style.background='#240d4b'">
                        <i class="fas fa-check"></i> Confirmar que Estou Segura
                    </button>
                </div>
            </div>

            <div class="zela-white-card">
                 <h3 style="color:#2D1A4A; display:flex; align-items:center; gap:10px; font-size:1.2rem; margin-top:0; margin-bottom:20px;">
                    <i class="fas fa-robot" style="color:#3b1c5f;"></i> Detecção Automática
                </h3>

                <div style="border: 1px solid #f1f1f1; border-radius: 12px; padding: 15px; margin-bottom: 15px; background: #fafafa;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div style="display:flex; gap:15px;">
                            <div style="width:40px; height:40px; background:#240d4b; color:white; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fas fa-bolt"></i></div>
                            <div>
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <strong style="color:#2D1A4A;">Detector de Movimento Brusco</strong>
                                    <span class="badge-light-green">Ativo</span>
                                </div>
                                <p style="color:#888; font-size:0.85rem; margin:5px 0 10px 0;">Detecta movimentos súbitos</p>
                            </div>
                        </div>
                        <label class="switch">
                          <input type="checkbox" checked>
                          <span class="slider"></span>
                        </label>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#555;">
                        <span>Sensibilidade</span><span>77%</span>
                    </div>
                    <input type="range" min="1" max="100" value="77" class="zela-range">
                    <button style="margin-top:15px; background:transparent; border:1px solid #3b1c5f; color:#3b1c5f; padding:6px 15px; border-radius:6px; font-size:0.85rem; cursor:pointer; font-weight: 600;"><i class="fas fa-pen"></i> Testar Sensor</button>
                </div>

                <div style="border: 1px solid #f1f1f1; border-radius: 12px; padding: 15px; background: #fafafa;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div style="display:flex; gap:15px;">
                            <div style="width:40px; height:40px; background:#240d4b; color:white; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fas fa-volume-up"></i></div>
                            <div>
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <strong style="color:#2D1A4A;">Detector de Sons Altos</strong>
                                    <span class="badge-light-green">Ativo</span>
                                </div>
                                <p style="color:#888; font-size:0.85rem; margin:5px 0 10px 0;">Identifica gritos ou sons altos</p>
                            </div>
                        </div>
                        <label class="switch">
                          <input type="checkbox" checked>
                          <span class="slider"></span>
                        </label>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#555;">
                        <span>Sensibilidade</span><span>80%</span>
                    </div>
                    <input type="range" min="1" max="100" value="80" class="zela-range">
                    <button style="margin-top:15px; background:transparent; border:1px solid #3b1c5f; color:#3b1c5f; padding:6px 15px; border-radius:6px; font-size:0.85rem; cursor:pointer; font-weight: 600;"><i class="fas fa-pen"></i> Testar Sensor</button>
                </div>
            </div>
        </div>

        <div class="privacy-banner">
            <strong style="font-weight: 700;">Privacidade:</strong> Todos os dados dos sensores são processados localmente no seu dispositivo. Nenhuma informação é enviada para servidores externos até que um alerta seja confirmado.
        </div>

        <div class="zela-white-card" style="margin-bottom: 80px;"> <h3 style="color:#2D1A4A; font-size:1.4rem; margin-top:0; margin-bottom:5px;">Dicas de Segurança</h3>
            <div class="tips-grid">
                <div class="tip-card" style="background:#f8f4ff; border: 1px solid #e0afff;">
                    <div class="tip-icon" style="background:#e0afff; color:#3b1c5f;"><i class="fas fa-mobile-alt"></i></div>
                    <div>
                        <strong style="color:#2D1A4A; display:block; margin-bottom:5px;">Mantenha celular carregado</strong>
                        <p style="color:#555; font-size:0.9rem; margin:0; line-height: 1.4;">Certifique-se de que seu dispositivo esteja sempre com bateria suficiente para acionar os alertas.</p>
                    </div>
                </div>
                <div class="tip-card" style="background:#fff0f8; border: 1px solid #ffcced;">
                    <div class="tip-icon" style="background:#965d7f; color:#ffffff;"><i class="fas fa-user-shield"></i></div>
                    <div>
                        <strong style="color:#2D1A4A; display:block; margin-bottom:5px;">Configure contatos</strong>
                        <p style="color:#555; font-size:0.9rem; margin:0; line-height: 1.4;">Adicione pessoas de confiança que possam responder rapidamente em caso de emergência.</p>
                    </div>
                </div>
                <div class="tip-card" style="background:#f0fdf4; border: 1px solid #bbf7d0;">
                    <div class="tip-icon" style="background:#dcfce7; color:#166534;"><i class="fas fa-clock"></i></div>
                    <div>
                        <strong style="color:#2D1A4A; display:block; margin-bottom:5px;">Check-ins regulares</strong>
                        <p style="color:#555; font-size:0.9rem; margin:0; line-height: 1.4;">Não espere até o último momento. Confirme sua segurança regularmente.</p>
                    </div>
                </div>
                <div class="tip-card" style="background:#fff7ed; border: 1px solid #fed7aa;">
                    <div class="tip-icon" style="background:#ffedd5; color:#c2410c;"><i class="fas fa-flask"></i></div>
                    <div>
                        <strong style="color:#2D1A4A; display:block; margin-bottom:5px;">Teste os sensores</strong>
                        <p style="color:#555; font-size:0.9rem; margin:0; line-height: 1.4;">Use os botões de teste para se familiarizar com como o sistema funciona.</p>
                    </div>
                </div>
            </div>
        </div>

        <button class="floating-sos" onclick="abrirModalSOS()">
            <i class="fas fa-exclamation-triangle"></i>
            <span>SOS</span>
        </button>
    `,
    // (As outras páginas continuam aqui embaixo normais: notes, profile, etc...)

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