
// =========================================
// ECOBIKE SP · SCRIPT.JS
// =========================================

// ---------- 1. FUNÇÕES DE REGRA DE NEGÓCIO ----------

// Calcula o valor total do aluguel
// Urbana = R$ 12/h
// Elétrica = R$ 20/h
// Cargo = R$ 25/h
// Acima de 5 horas: 10% de desconto

function calcularValor(horas, tipo) {

  // Valores por hora de cada bicicleta
  const precos = {
    urbana: 12,
    eletrica: 20,
    cargo: 25
  };

  // Calcula o preço conforme o tipo escolhido
  let valor = horas * precos[tipo];

  // Aplica 10% de desconto para mais de 5 horas
  if (horas > 5) {
    valor = valor * 0.9;
  }

  return valor;
}


// Formata o valor para o padrão brasileiro de moeda

function formatarMoeda(valor) {

  return 'R$ ' + valor.toFixed(2).replace('.', ',');

}


// ---------- 2. SELECIONANDO OS ELEMENTOS DO HTML ----------

// Elementos do simulador
const inputHoras = document.querySelector('#horas');
const selectTipo = document.querySelector('#tipo');
const btnCalcular = document.querySelector('#calcular');
const resultado = document.querySelector('#resultado');

// Elementos das reservas
const inputNome = document.querySelector('#nome');
const btnAdicionar = document.querySelector('#adicionar');
const lista = document.querySelector('#lista');
const total = document.querySelector('#total');

// Botão do modo escuro
const btnTema = document.querySelector('#btnTema');


// ---------- 3. FUNÇÕES QUE MANIPULAM O DOM ----------

// Exibe o resultado do simulador

function mostrarResultado() {

  const horas = Number(inputHoras.value);
  const tipo = selectTipo.value;

  // Verifica se a quantidade de horas é válida
  if (isNaN(horas) || horas <= 0 || horas > 24) {

    resultado.textContent = 'Informe um número de horas válido';
    return;

  }

  // Calcula e formata o valor do aluguel
  const valor = calcularValor(horas, tipo);
  const valorFormatado = formatarMoeda(valor);

  // Mostra o resultado na página
  resultado.textContent = valorFormatado;

}


// Atualiza a quantidade de reservas

function atualizarContador() {

  total.textContent = lista.querySelectorAll('li').length;

}


// Adiciona uma nova reserva à lista

function adicionarReserva() {

  const nome = inputNome.value.trim();

  // Impede adicionar nomes vazios
  if (nome === '') return;

  // Cria um novo item da lista
  const item = document.createElement('li');

  // Coloca o nome dentro do item
  item.textContent = nome;

  // Cria o botão de remover
  const btnRemover = document.createElement('button');

  btnRemover.textContent = 'Remover';
  btnRemover.type = 'button';

  // Remove a reserva ao clicar no botão
  btnRemover.addEventListener('click', function() {

    item.remove();
    atualizarContador();

  });

  // Adiciona o botão ao item
  item.appendChild(btnRemover);

  // Adiciona o item à lista de reservas
  lista.appendChild(item);

  // Limpa o campo de nome
  inputNome.value = '';

  // Atualiza a quantidade de reservas
  atualizarContador();

}


// Alterna entre o modo claro e escuro

function alternarTema() {

  // Adiciona ou remove a classe dark do body
  document.body.classList.toggle('dark');

  // Verifica se o modo escuro está ativado
  const modoEscuro = document.body.classList.contains('dark');

  // Atualiza o texto do botão
  if (modoEscuro) {

    btnTema.textContent = '☀️ Modo claro';

  } else {

    btnTema.textContent = '🌙 Modo escuro';

  }

}


// ---------- 4. EVENTOS ----------

// Simulador
btnCalcular.addEventListener('click', mostrarResultado);

// Pré-reserva
btnAdicionar.addEventListener('click', adicionarReserva);

// Modo escuro
btnTema.addEventListener('click', alternarTema);
