let tentativas = 1 //Varivel para contatar tentativas
let numeroLimite = 10; //variavel do numero limete de numero sorteado
let listaNumSorteado = []; //vetor/lista para verificar se o numero sorteado nao e igual ao anterior
let numSecreto = geraNumSecreto(); //variavel do que contem o numero secreto, chamando o numero secreto

//Funcao Para gerar o numero secreto
function geraNumSecreto(){
    //Definindo variavel que vai guardar o numero secreto, numero secreto sendo sorteado pela funcao do js Match.random 
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    //Definindo quantidade de elementos na lista com o valor que total de intens na lista (length)
    let quantidadeDeElementosNaLista = listaNumSorteado.length;
    //se tiver mesma quantidade de numeros que o numero limite
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaNumSorteado = []; //zerar lista
    }
    //se numero sorteado for igual a algum que ja tem na lista (includes)
    if(listaNumSorteado.includes(numeroEscolhido)){
        return geraNumSecreto(); //sorteia outro numero
    } else{ //se nao
        listaNumSorteado.push(numeroEscolhido); //coloca o numero na lista (push)
        return numeroEscolhido; //retorna o numero escolhido
    }
 }

//funcao para exibir algum texto na tela
 function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); //Seleciona algum campo do html (tag)
    campo.innerHTML = texto; //coloca nesse campo (innerHTML) o texto desejado
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2}); //aplicacao para falar o texto
}

//funcao texto padrao
 function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto'); //mensagem de saudacao
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); //mensagem pedindo principal acao
}

mensagemInicial(); //chamada do texto padrao

//Verifica o numero que foi chutado
function verificarChute() { //essa funcao so e chamada quando clicar no botao chute
    let chute = document.querySelector('input').value; //Fazendo leitura do chute na caixa de texto
    //se chute for igual numero secreto
    if ( chute == numSecreto){
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"; // definindo palavra tentativa no plural ou singular 
        exibirTextoNaTela('h1',"Acertou!"); // escreve na tela o acerto
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}` //definindo em uma variavel que recebe uma tamplate string 
        exibirTextoNaTela('p', mensagemTentativas); //escre na tela mensagem de acertos 
        document.getElementById("reiniciar").removeAttribute('disabled'); //ativando o botao de novo jogo pelo ID dele
    } 
   
    else { //Se nao for igual ao numero secreto
        exibirTextoNaTela('h1',"Voce errou!"); //escreve na tela erro
        //dica se o numero e maior ou menor
        if(chute > numSecreto){
          exibirTextoNaTela('p', "O Numero secreto e menor que " + chute);  
        } else {
            exibirTextoNaTela('p', "O Numero secreto e maior que " + chute);
        }
        tentativas++; //contagem tentativas 
        limparCampo(); //limpa campo para escrever um novo numero
    }
}

//funcao para limpar campo dos numeros
function limparCampo(){
    chute =document.querySelector('input'); //selecionando o campo dos numeros
    chute.value = ""; //definindo ele com nada dentro
}

//funcao para reiniciar jogo
function reiniciarJogo(){ //essa funcao so e chamada quando clicar no botao Novo jogo
    numSecreto = geraNumSecreto(); //gera um novo numero secreto
    limparCampo(); //limpa o que estiver no campo
    tentativas = 1; //Reinicia o numeros de tentativas
    mensagemInicial(); //Chama texto padrao
    document.getElementById("reiniciar").setAttribute('disabled', true); //desabilita botao novamente
}