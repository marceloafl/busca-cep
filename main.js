const inputCep = document.querySelector('[ data-input="cep"]');
const inputLogradouro = document.querySelector('[ data-input="logradouro"]');
const inputNumero = document.querySelector('[ data-input="numero"]');
const inputComplemento = document.querySelector('[ data-input="complemento"]');
const inputBairro = document.querySelector('[ data-input="bairro"]');
const inputCidade = document.querySelector('[ data-input="cidade"]');
const inputEstado = document.querySelector('[ data-input="estado"]');
const inputPais = document.querySelector('[ data-input="pais"]');

inputCep.addEventListener('change', function(){
    const cep = inputCep.value;
    getCep(cep);

    inputCep.setAttribute('type', 'text');
    inputCep.value = cep.substr(0, 5) + '-' + cep.substr(5, 8);
})

inputCep.addEventListener('click', function(){
    inputCep.setAttribute('type', 'number');
})

async function getCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json`;
    
    if (cep.length !== 8){
        showError();
        return;
    };

    try{
        const response = await fetch(url);
        const cep = await response.json();

        if(cep.erro){
            resetInputs();
            alert('CEP não encontrado');
            return;
        }
        handleInputs(cep);

    } catch(error){
        alert('CEP não encontrado');
    }
}

function handleInputs(cep){
    inputLogradouro.value = cep.logradouro;
    inputBairro.value = cep.bairro;
    inputCidade.value = cep.localidade;
    inputEstado.value = cep.uf;
    inputPais.value = 'Brasil';
}

function resetInputs(){
    inputLogradouro.value = '';
    inputBairro.value = '';
    inputCidade.value = '';
    inputEstado.value = '';
    inputPais.value = '';
}

function showError(){
    alert('Digite um CEP com 8 números.')
}

