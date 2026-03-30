async function conectarComBack() {
    try{
        const resposta = await fetch();
        const dados = await resposta.text();

        console.log(dados)
        alert(`Resposta do back: ${dados}`)
    } catch (erro){
        console.error(`Erro ao conectar com o backend: `, erro)
    }
    
};