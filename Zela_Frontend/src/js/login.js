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
            //alert('Bem-vinda de volta ao Zela!');
            // Redireciona para a página principal (ajuste o nome se necessário)
            window.location.href = 'src/dashboardPage.html';
        } else {
            alert('E-mail ou senha incorretos. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro de conexão:', erro);
        alert('O servidor está desligado. Ligue o Java e tente novamente!');
    }
});