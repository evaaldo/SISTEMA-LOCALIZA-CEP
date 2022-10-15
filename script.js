const cep = document.getElementById('cep')
const btn = document.getElementById('botao');
const info = document.getElementById('info');
const mensagemErro = document.getElementById('mensagem-erro')

async function buscaEndereco(cep) {
    try {
        var localizaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var localizaCEPConvertido = await localizaCEP.json();
        if(localizaCEPConvertido.erro) {
            throw Error('CEP não encontrado.');
        }
        var cidade = localizaCEPConvertido.localidade;
        var estado = localizaCEPConvertido.uf;
        var bairro = localizaCEPConvertido.bairro;
        var endereco = localizaCEPConvertido.logradouro;

        info.style.display = 'block';
        info.innerHTML = `
        <h2>Informações do local</h2>
        <p id="cidade">Cidade: ${cidade}</p>
        <p id="estado">Estado: ${estado}</p>
        <p id="bairro">Bairro: ${bairro}</p>
        <p id="endereco">Endereço: ${endereco}</p>
        `

        mensagemErro.innerHTML = '';

        console.log(localizaCEPConvertido);
    } catch(erro) {
        console.log(erro);
        info.innerHTML = '';
        info.style.display = 'none'
        mensagemErro.innerHTML = 'CEP desconhecido!, por favor insira um válido.';
    }

}

btn.addEventListener('click', () => buscaEndereco(cep.value));
