/*Função somatória*/
function funcSum(arr = []) {
  /**
   * Teremos neste array um elemento a cada resultado da multiplicação do peso pela entrada
   * Este array irá variar de acordo com a quantidade entrada que estamos utilizando na nossa rede
   */
  /* Reduz os seus elementos em um único valor numérico*/
  /* a e b representam o elemento anterior e posterior respectivamente*/
  return arr.reduce((a, b) => a + b)
}

/* Gradiente descendente */
function gradientDescent(n = 0) {
  /**
   * Aplica a fórmula conhecida como descida do gradiente e será usada para calcular o erro
   * que nada mais é do que a diferença entre o valor obtido e o valor esperado
   * Iremos retornar o resultado desta forma aplicada ao erro para uma multiplicação do retorno
   * da nossa Descida do Gradiente pelas entradas que foram passadas na nossa input layer, passando
   * o resultado desta multiplicação como valor de atualização dos pesos da próxima etapa do nosso cálculo,
   * que, por sua vez, serão novamente multiplicados pelos valores de entrada, e assim obteremos respostas mais
   * próximas do ideal
   */
  return n * (1 - n)
}

function feedForward(
  inputs = [],
  target = 0,
  epochs = 1,
  activation = 'sigmoid'
) {
  var timeStart = Date.now()
  var foundIn= 0;

  console.log("PROCESSANDO...")

  if (target <= 0) target = 0.1
  else if (target > 1) target = 1
  //os pesos que serão multiplicados pelos valores de entrada
  let weights = []
  //iniciamos nossos pesos com valores aleatorios da primeira etapa do calculo
  for (let i = 0; i < inputs.length; i++) {
    weights.push(Math.random())
  }

  for (let i = 1; i <= epochs; i++) {
    // a partir da primeira iteração do for o nosso neuronio passará a ser uma rede neural artificial
    // porque ele já terá recebido dados do nosso neuronio anterior, ligando um neuronio ao outro
    //Multiplicamos cada peso por cada valor de entrada
    let multiply = [] //cada elemento do array terá uma multiplicação de um peso por uma entrada
    for (let j = 0; j < inputs.length; j++) {
      if (inputs[j] <= 0) inputs[j] = 0.1 //somente para não anularmos a nossa multiplicação,
      //previnindo multiplicação por zero
      multiply.push(inputs[j] * weights[j])
    }
    let sum = funcSum(multiply)

    let output = 0

    switch (activation) {
      case 'tanh':  output = parseFloat(tanh(sum)).toFixed(4); break;
      case 'binaryStep':   output = parseFloat(binaryStep(sum)).toFixed(4);break;
      case 'sigmoid':  output = parseFloat(sigmoid(sum)).toFixed(4); break;
      case 'relu':  output = parseFloat(relu(sum)).toFixed(4); break;
      case 'leakyRelu':  output = parseFloat(leakyRelu(sum)).toFixed(4);break;
      default:  output =sigmoid(sum).toFixed(4);break; 


    }

    //calcula a diferença do valor retornado por output para o valor que queremos como resposta em target
    let error = parseFloat(Math.abs(target - output)).toFixed(4)
    //otimiza os pesos ao final do loop para a proxima iteração, tornando os pesos cada vez mais precisos
    // e cada vez fornecendo resutado mais próximo de target
    for (let j = 0; j < inputs.length; j++) {
      if (inputs[j] <= 0) inputs[j] = 0.1 //somente para não anularmos a nossa multiplicação,
      weights[j] += inputs[j] * gradientDescent(error)
    }


    let epoch = i
  
    if (output == target && foundIn==0) {
        foundIn=epoch;
    }

      console.log(`Época: ${epoch} - taxa de erro: ${error} - saída: ${output}`)

    if ( foundIn!=0&&epoch>=foundIn+300)
    {
        console.log(`Época: ${epoch} - taxa de erro: ${error} - saída: ${output}`)
        console.log('Encontrado na época: ' + foundIn)
        console.log('Com estas configurações é recomendado usar ' + (foundIn+300) +' épocas nas próximas execuções')
        break
    }

  }

  var timeEnd = Date.now()
  console.log('Duração ' + (timeEnd - timeStart) + ' milisegundos . . .')
}

//tangente hiperbólica: retorna valores entre -1 e 1
function tanh(n = 0) {
  return Math.sinh(n) / Math.cosh(n)
}
//sigmoide: retorna valores entre 0 e 1
function sigmoid(n = 0) {
  return 1 / (1 + Math.pow(Math.E, -n))
}
//unidade linear retificada (relu): retorna somente valores nulos e positivos
function relu(n = 0) {
  return Math.max(n, 0)
}
//unidade linear retificada com fazamento (leaky relu): retorna somente valores maiores que zero
function leakyRelu(n = 0) {
  return Math.max(n, 0.01)
}
/*Passo binário: retorna somente 0 ou 1*/
function binaryStep(n = 0) {
  return n >= 0 ? 1 : 0
}
//Nunca use inputs maiores do que o output
feedForward([0.0123, 0, 0.0002, 0.0021], 0.10000, 50000000000,'tanh')
