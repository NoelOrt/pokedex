const body=document.getElementsByTagName('body')[0]
let fondo=localStorage.getItem('fondo')
body.setAttribute('data-theme',fondo)
const swithcer=document.querySelectorAll('input[name="switcher"]')
swithcer.forEach((sw)=>{
    sw.addEventListener('change',switchtheme)
})
function switchtheme(e){
    switch(e.target.value){
        case 'dark':
            body.setAttribute('data-theme','dark');
            localStorage.setItem('fondo','dark')
            break;
        case 'light':
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('fondo','light')
            break;
        


    }
}
var cartas=0
function setPokemonCard(num, pokemon){
    var pokeid=localStorage.getItem("pokeid");
    console.log('pasa por setpoke',pokeid)
    var image = document.getElementById(`pokemon_img${num}`)
    var name = document.getElementById(`pokemon_name${num}`)
    var attack = document.getElementById(`pokemon_height${num}`)
    var defenses = document.getElementById(`pokemon_weight${num}`)
    var abilities = document.getElementById(`pokemon_abilities${num}`)
    image.setAttribute("src", pokemon.sprites.other.dream_world.front_default)
    name.innerText =  pokemon.name
    attack.innerText =  pokemon.stats[1].base_stat
    defenses.innerText =  pokemon.stats[2].base_stat
    abilities.innerText =  pokemon.abilities.length
    if (pokeid==1){localStorage.setItem("pokemon1", JSON.stringify(pokemon));}
    else{localStorage.setItem("pokemon2", JSON.stringify(pokemon));}
    defensa=pokemon.stats[2].base_stat
    
}


let num = Math.floor(Math.random() * 800) + 1;
function consultarPokemon(num){      
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then( function(response){
        response.json()
        .then(function (pokemon){
            setPokemonCard(num, pokemon)
        
        })
        
    })

}

function criaCardPokemon(id){
    var card = `
        <div class="img_card">
            <img id="pokemon_img${id}" src="">
        </div>

        <p class="pokemon_id">ID: #${id}</p>
        <p class="pokemon_name" id="pokemon_name${id}"></p>

        <div class="pokemon_attributes">
            <div class="attribute">
                <p class="pokemon_height" id="pokemon_height${id}"></p>
                <p>attack</p>
            </div>
            <div class="attribute">
                <p class="pokemon_weight" id="pokemon_weight${id}"></p>
                <p>defenses</p>
            </div>
            <div class="attribute">
                <p class="pokemon_abilities" id="pokemon_abilities${id}"></p>
                <p>abilities</p>
            </div>
        </div>
       
    `
    return card
}

function inicio(){
    var card = `
        <div class="img_card">
            <img id="pokemon_img" src="img/inte.png">
        </div>
        
    `
    return card
}
const timer = ms => new Promise(res => setTimeout(res, ms))
async function gerarCards(id = 1){
    if(cartas==0){
        
        if(id < 3){
            var panel = document.getElementsByClassName("panelB")[0]

            for(var i = id; i<id+2; i++){

                var card = document.createElement("div")
                card.className = "pokemon_card"+i
                card.innerHTML = inicio()
                panel.appendChild(card)
             
            }
            console.log('ha pasado por aqui')
            cartas+=1;
            return i
        }
        return id
        
    }
    if(cartas==2){
        if(id < 3){
            
            for(var i = id; i<id+2; i++){
                console.log(i)
                localStorage.setItem("pokeid", i)
                var panel = document.getElementsByClassName("pokemon_card"+i)[0]
                var card = document.createElement("div")
                let rand = Math.floor(Math.random() *600) + 1;
                card.className = "pokemon_card"+i
                card.innerHTML = criaCardPokemon(rand)
                consultarPokemon(rand)
                panel.replaceWith(card)
                await timer(300);
                
                
            }
      
            return i
        }
    }
    if(cartas==3){
        var pokemon1=JSON.parse(localStorage.getItem("pokemon1"));
        var pokemon2=JSON.parse(localStorage.getItem("pokemon2")); 
        var win=localStorage.getItem("win");
        var pokemonWin;
        if(win==1){pokemonWin=pokemon1};
        if(win==2){pokemonWin=pokemon2};
        var num=pokemonWin.id
        var panel = document.getElementsByClassName("panelB")[0]      
        var card = document.createElement("div")  
        card.className = "pokemon_card"+3
        card.innerHTML = criaCardPokemon(num)
        consultarPokemon(num)
        panel.replaceWith(card)
        return i
    }
    return id
}
function botText() {
    var butBat=document.getElementById("battleButton");
    if (cartas==0 ) butBat.innerHTML = 'Seleccionar Luchadores!';
    if(cartas==2) butBat.innerHTML = 'Batalla!'; 
    if(cartas==3)  butBat.innerHTML = 'Inicio!';

}
 
function batalla(){
    console.log('entra en batalla')
    var pokemon1=JSON.parse(localStorage.getItem("pokemon1"));
    var pokemon2=JSON.parse(localStorage.getItem("pokemon2"));
    var resumen=document.getElementById("resumen");
    if(pokemon1.stats[1].base_stat<pokemon2.stats[2].base_stat){
        win=2;
        localStorage.setItem("win", 2);
        console.log(win)
        console.log(cartas)
        console.log('gana derecha')
        
        resumen.innerText= pokemon1.name+'ataca y pierde contra'+pokemon2.name;
    }
    else if(pokemon1.stats[1].base_stat>pokemon2.stats[2].base_stat){
        localStorage.setItem("win", 1);
        win=1;
        console.log(win)
        console.log(cartas)
        console.log('gana izq')
        resumen.innerText=pokemon1.name+' ataca y gana contra'+  pokemon2.name;

    }
    else{
        localStorage.setItem("win", 3);
        win=3;
        console.log(win)
        console.log(cartas)
        console.log('empate')
        resumen.innerText= pokemon1.name+' '+' ataca y empata contra'+' '+pokemon2.name;

    }
    
    return win;
    
}

if(cartas===0){
    botText()
    gerarCards()
    console.log(cartas)
    
}
document.getElementById("battleButton").addEventListener("click", function(){
    if ((cartas===1)&&(cartas<2)){
    console.log ('pulsado');
    console.log(cartas)
    cartas+=1
    console.log(cartas)
    botText()
    gerarCards() 
    return
    }
    if (cartas===2){
    var pokemon1=JSON.parse(localStorage.getItem("pokemon1"));
    var pokemon2=JSON.parse(localStorage.getItem("pokemon2"));
    console.log(pokemon1, pokemon2)
    console.log ('pulsado2');
    batalla()
    cartas+=1
    botText()
    gerarCards()
    console.log(cartas)
    return
    }
    if (cartas===3){
    console.log ('reset');
    localStorage.removeItem("pokemon1");
    localStorage.removeItem("pokemon2");
    localStorage.removeItem("win");
    cartas=0;
    location.reload();
    }


})
    
