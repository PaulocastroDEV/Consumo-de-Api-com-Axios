axios.get("http://localhost:3000/games").then(response =>{
    let games = response.data;
    let list = document.getElementById("games");
    games.forEach(game =>{
        let item = document.createElement("li");

        item.setAttribute("data-id",game.id);
        item.setAttribute("data-title",game.title);
        item.setAttribute("data-price",game.price);
        item.setAttribute("data-year",game.year)


        item.innerHTML = "ID: " + game.id + " - " + game.title + " - $ " + game.price;

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML="Deletar";
        item.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",function(){
            deleteGame(item)
        })

        let editeBtn= document.createElement("button")
        editeBtn.innerHTML="Editar";
        item.appendChild(editeBtn);
        editeBtn.addEventListener("click",function(){
            loadForm(item);
        })

        list.appendChild(item);
    })
    console.log(games)
}).catch(error =>{
    console.log(error)
});

function createGame(){
    let titleInput = document.getElementById("title");
    let yearInput = document.getElementById("year");
    let priceInput = document.getElementById("price");

    let game={
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }
    axios.post("http://localhost:3000/game",game).then(response=>{
        if(response.status ==200){
            alert("Game cadastrado");
        }
    }).catch(err=>{
        console.log(err)
    })
    
}

function deleteGame(ListItem){
    let id = ListItem.getAttribute("data-id");
    axios.delete("http://localhost:3000/game/"+id).then(response=>{
        if(response.status ==200){
            alert("Game deltado");
        }
    }).catch(err=>{
        console.log(err)
    })
}
function loadForm(ListItem){
    let id=ListItem.getAttribute("data-id");
    let title= ListItem.getAttribute("data-title");
    let year = ListItem.getAttribute("data-year");
    let price = ListItem.getAttribute("data-price"); 

    document.getElementById("idEdit").value=id;
    document.getElementById("titleEdit").value=title;
    document.getElementById("yearEdit").value=year;
    document.getElementById("priceEdit").value=price;
}
function updateGame(){
    var idInput = document.getElementById("idEdit")
    let titleInput = document.getElementById("titleEdit");
    let yearInput = document.getElementById("yearEdit");
    let priceInput = document.getElementById("priceEdit");

    let game={
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }

    let id = idInput.value;

    axios.put("http://localhost:3000/game/"+id,game).then(response=>{
        if(response.status ==200){
            alert("Game Atualizado");
        }
    }).catch(err=>{
        console.log(err)
    })
    
}