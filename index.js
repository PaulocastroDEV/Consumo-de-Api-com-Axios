const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//banco de dados falso

const db = {
  games: [
    {
      id: 1,
      title: "Call of duty MW",
      year: 2019,
      price: 60,
    },
    {
      id: 2,
      title: "Sea of thieves",
      year: 2018,
      price: 40,
    },
    {
      id: 3,
      title: "Minecraft",
      year: 2012,
      price: 20,
    },
  ],
};

let idGenerate = db.games[db.games.length - 1].id;

app.get("/games", (req, res) => {
  res.status(200).json(db.games);
});

app.get("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const game = db.games.find((g) => g.id == id);
    if (game !== undefined) {
      res.status(200).json(game);
    } else {
      res.sendStatus(404);
    }
  }
});
app.post("/game", (req, res) => {
  const { title, price, year } = req.body;
  if (isNaN(price) || isNaN(year) || typeof title != "string") {
    res.sendStatus(400);
  } else {
    const game = req.body;
    db.games.push({
      id: ++idGenerate,
      title,
      price,
      year,
    });
    res.status(200).json(game);
  }
});

app.delete("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);

    const index = db.games.findIndex((g) => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      db.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});
app.put("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);

    const game = db.games.find((g) => g.id == id);

    if (game !== undefined) {
      const { title, price, year } = req.body;

      if (title !== undefined) {
        game.title = title;
      }
      if (price !== undefined) {
        game.price = price;
      }
      if (year !== undefined) {
        game.year = year;
      }

      res.status(200).json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(3000, () => {
  console.log("Api rodando");
});
