document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o envio do formulário padrão
    if (validateForm()) {
      sendData();
    }
  });
});
function getFormData() {
  const name = document.getElementById("name").value.toUpperCase(); // Converter o nome para maiúsculas

  const products = [
    "amendoim",
    "bananada",
    "doceabobora",
    "doceamendoim",
    "pacoquita",
    "5star",
    "alpino",
    "baton",
    "bis",
    "caribe",
    "galak",
    "chockito",
    "crocante",
    "crunch",
    "kitkat",
    "lolo",
    "moca",
    "prestigio",
    "sensacao",
    "snicker",
    "talento",
    "trentoallegro",
    "trentobites",
    "trento",
    "twix",
    "nutela",
    "mentos",
    "halls",
    "jujuba",
    "mentostrident",
    "batata",
    "biscoitopolvilho",
    "doritos",
    "fofura",
    "skinny",
    "torcida",
    "bolinhoduo",
    "pipocafrank",
    "coca250ml",
    "guaravita290ml",
    "sprite200ml",
    "sucodelvale200ml",
    "portacracha",
    "puxacracha",
  ];

  // Inicializa o valor total do pedido do dia
  let totalValue = 0;

  for (const product of products) {
    const quantity = parseInt(document.getElementById(product).value) || 0;
    const price = parseFloat(
      document
        .querySelector(`label[for="${product}"]`)
        .textContent.match(/\(R\$(\d+\.\d+)\)/)[1]
    );

    // Calcula o valor total para o produto
    const totalProductValue = quantity * price;

    // Soma o valor total do produto ao valor total do dia
    totalValue += totalProductValue;
  }

  // Obtém a data e hora atual
  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString().replace(/,/, "-");

  const data = {
    name,
    totalValueOfDay: totalValue,
    orderDateTime: formattedDateTime,
  };

  for (const product of products) {
    const quantity = parseInt(document.getElementById(product).value) || 0;
    const price = parseFloat(
      document
        .querySelector(`label[for="${product}"]`)
        .textContent.match(/\(R\$(\d+\.\d+)\)/)[1]
    );

    // Calcula o valor total para o produto
    const totalProductValue = quantity * price;

    // Adiciona a propriedade com o valor total ao objeto data
    data[product + "TotalValue"] = totalProductValue;
  }

  return data;
}

function validateForm() {
  const name = document.getElementById("name").value;

  // Verifique se o nome não está vazio
  if (name.trim() === "") {
    alert("Por favor, insira um nome.");
    return false;
  }

  // Verifique se pelo menos um produto foi selecionado
  const data = getFormData();
  const selectedProducts = Object.values(data).filter(
    (value) => typeof value === "number" && value > 0
  );

  if (selectedProducts.length === 0) {
    alert("Selecione pelo menos um produto.");
    return false;
  }

  return true;
}

function showAlert(message) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.classList.add("alert");

  document.body.appendChild(alertDiv);

  // Fechar o alerta após 3 segundos
  setTimeout(function () {
    document.body.removeChild(alertDiv);
  }, 3000); // 3000 milissegundos (3 segundos)
}

function sendData() {
  const data = getFormData();

  fetch("https://api.sheetmonkey.io/form/xuCL3Q9ZZdMQkGoVp6fXWu", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      // Limpar os dados do formulário
      // Exibir uma mensagem de sucesso usando showAlert
      showAlert("Dados enviados com sucesso!");

      // Aguardar 3 segundos e, em seguida, redirecionar para a página inicial
      setTimeout(function () {
        window.location.href = "/";
      }, 3000); // 3000 milissegundos (3 segundos)
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao enviar os dados para a API:", error);
      // Tratar erros, se necessário
    });
}

function incrementaValor(valorMaximo, id) {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value >= valorMaximo) {
    value = valorMaximo;
  } else {
    value++;
  }
  document.getElementById(id).value = value;
}

function decrementaValor(valorMinimo, id) {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value <= valorMinimo) {
    value = 0;
  } else {
    value--;
  }
  document.getElementById(id).value = value;
}
