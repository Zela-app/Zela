// Captura o formulário quando o usuário clica em "Entrar"
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede a página de piscar/recarregar

    // Pega o que o usuário digitou nos campos
    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;

    try {
        // Envia os dados para a porta 8080 (onde o Java está rodando)
        const resposta = await fetch('http://localhost:8080/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Empacota o email e a senha em formato JSON
            body: JSON.stringify({ email: emailDigitado, senha: senhaDigitada })
        });

        // O Java respondeu! Vamos ver se a senha estava certa:
        if (resposta.ok) {
            // Desempacota o JSON que o Java mandou de volta
            const dadosDoJava = await resposta.json();
            
            // Salva os dados na memória do navegador (nossa "mochila")
            localStorage.setItem('perfilUsuario', dadosDoJava.tipoUsuario);
            localStorage.setItem('emailUsuario', emailDigitado);
            
            // ==========================================
            // SALVA O NOME PARA USAR NO DASHBOARD/PERFIL
            // ==========================================
           localStorage.setItem('nomeUsuario', dadosDoJava.nome);
    // ADICIONE ESTA LINHA:
    localStorage.setItem('idUsuario', dadosDoJava.idUsuario);

            // ==========================================
            // O REDIRECIONAMENTO INTELIGENTE POR PERFIL
            // ==========================================
            if (dadosDoJava.tipoUsuario === 'psicologo') {
                // Se for psicólogo, vai para o painel de pacientes
                window.location.href = 'src/Psicolo_page.html'; 
            } else {
                // Se for usuária padrão, vai para a Central de Segurança / Dashboard
                window.location.href = 'src/dashboardPage.html';
            }

        } else {
            alert('E-mail ou senha incorretos. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro de conexão:', erro);
        alert('O servidor está desligado. Ligue o Java e tente novamente!');
    }
});