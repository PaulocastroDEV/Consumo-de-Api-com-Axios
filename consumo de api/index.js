axios
  .get("http://localhost:3000/games")
  .then((response) => {
    const games = response.data;
    const list = document.getElementById("games");
    games.forEach((game) => {
      const item = document.createElement("li");

      item.setAttribute("data-id", game.id);
      item.setAttribute("data-title", game.title);
      item.setAttribute("data-price", game.price);
      item.setAttribute("data-year", game.year);

      item.innerHTML =
        "ID: " + game.id + " - " + game.title + " - $ " + game.price;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Deletar";
      item.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function () {
        deleteGame(item);
      });

      const editeBtn = document.createElement("button");
      editeBtn.innerHTML = "Editar";
      item.appendChild(editeBtn);
      editeBtn.addEventListener("click", function () {
        loadForm(item);
      });

      list.appendChild(item);
    });
    console.log(games);
  })
  .catch((error) => {
    console.log(error);
  });

function createGame() {
  const titleInput = document.getElementById("title");
  const yearInput = document.getElementById("year");
  const priceInput = document.getElementById("price");

  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  };
  axios
    .post("http://localhost:3000/game", game)
    .then((response) => {
      if (response.status == 200) {
        alert("Game cadastrado");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteGame(ListItem) {
  const id = ListItem.getAttribute("data-id");
  axios
    .delete("http://localhost:3000/game/" + id)
    .then((response) => {
      if (response.status == 200) {
        alert("Game deltado");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function loadForm(ListItem) {
  const id = ListItem.getAttribute("data-id");
  const title = ListItem.getAttribute("data-title");
  const year = ListItem.getAttribute("data-year");
  const price = ListItem.getAttribute("data-price");

  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}
function updateGame() {
  const idInput = document.getElementById("idEdit");
  const titleInput = document.getElementById("titleEdit");
  const yearInput = document.getElementById("yearEdit");
  const priceInput = document.getElementById("priceEdit");

  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  };

  const id = idInput.value;

  axios
    .put("http://localhost:3000/game/" + id, game)
    .then((response) => {
      if (response.status == 200) {
        alert("Game Atualizado");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
