const body=document.getElementsByTagName('body')[0]
let fondo=localStorage.getItem('fondo1')
body.setAttribute('data-theme',fondo)
const swithcer=document.querySelectorAll('input[name="switcher"]')
swithcer.forEach((sw)=>{
    sw.addEventListener('change',switchtheme)
})
function switchtheme(e){
    switch(e.target.value){
        case 'dark':
            body.setAttribute('data-theme','dark');
            localStorage.setItem('fondo1','dark')
            break;
        case 'light':
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('fondo1','light')
            break;
        


    }
}
var ver=0
const timer = ms => new Promise(res => setTimeout(res, ms))
function setPokemonCard(rand, pokemon,b){
    localStorage.setItem("pokemon"+b, JSON.stringify(pokemon));
    var image = document.getElementById(`pokemon_img${rand}`)
    var name = document.getElementById(`pokemon_name${rand}`)
    var attack = document.getElementById(`pokemon_attack${rand}`)
    var defenses = document.getElementById(`pokemon_defenses${rand}`)
    var abilities = document.getElementById(`pokemon_abilities${rand}`)
    image.setAttribute("src", pokemon.sprites.other.dream_world.front_default)
    name.innerText =  pokemon.name
    attack.innerText =  pokemon.stats[1].base_stat
    defenses.innerText =  pokemon.stats[2].base_stat
    abilities.innerText =  pokemon.abilities.length
}

function consultarPokemon(rand,b){      
    fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`)
    .then( function(response){
        response.json()
        .then(function (pokemon){
            setPokemonCard(rand, pokemon,b)
        })
    })
}

function buscaPokemon(){
    var panel = document.getElementsByClassName("panel")[0]
    panel.innerHTML = ""
    var idd = document.getElementById("Busca").value.toLowerCase()
    var card = document.createElement("div")
    card.className = "pokemon_card"
    card.innerHTML = criaCardPokemon(idd)
    consultarPokemon(idd)
    panel.appendChild(card)
}

document.getElementById("Busca").addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        buscaPokemon()
    }
}); 

document.getElementById("Busca").addEventListener("focusout", function(event){
    var panel = document.getElementsByClassName("panel")[0]
    panel.innerHTML = ""
    $id = gerarCards(1)
}); 


function criaCardPokemon(id){
    var card = `
        <div class="img_card">
            <img id="pokemon_img${id}" src="">
        </div>

        <p class="pokemon_id">ID: #${id}</p>
        <p class="pokemon_name" id="pokemon_name${id}"></p>

        <div class="pokemon_attributes">
            <div class="attribute">
                <p class="pokemon_attack" id="pokemon_attack${id}"></p>
                <p>attack</p>
            </div>
            <div class="attribute">
                <p class="pokemon_defenses" id="pokemon_defenses${id}"></p>
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


function gerarCards(id = 1){
    
    if(id < 650){
    
        var panel = document.getElementsByClassName("panel")[0]
        var a=0
        var b=10
        for(var i = id; i<id+10; i++){
            
            
            var card = document.createElement("div")
            let rand = Math.floor(Math.random() *600) + 1;
            card.className = "pokemon_card"
            card.id="pokemon_card"+a
            card.innerHTML = criaCardPokemon(rand)
            consultarPokemon(rand,b)
            panel.appendChild(card)
            a++
            b++
        }

        return i
    }
    return id
}
async function borrarCard3(){
    var panel = document.getElementsByClassName("pokemon_card3")[0]
    panel.remove()
    ver=0
    await timer(100)
    console.log(ver)
    return
}

function verPoke(consulta){
    rand=consulta.id;
    console.log(rand)
    var panel = document.getElementById("panelCon")
    var card = document.createElement("div")  
    card.className="pokemon_card"+3
    card.innerHTML = criaCardPokemon(rand)
    consultarPokemon(rand)
    console.log(card)
    panel.replaceWith(card)
    console.log('verpoke')
    ver=5
    return
}
function ampPoke(consulta,ver){
    if(ver==0){verPoke(consulta)}
    //else{borrarCard3()}
    else{location.reload();}
}


    
var consulta
var $id = gerarCards($id)

    
document.getElementById("pokemon_card0").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon10"));
    
    ampPoke(consulta,ver)})
  
document.getElementById("pokemon_card1").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon11"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card2").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon12"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card3").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon13"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card4").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon14"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card5").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon15"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card6").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon16"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card7").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon17"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card8").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon18"));
    console.log(consulta)
    ampPoke(consulta,ver)})
document.getElementById("pokemon_card9").addEventListener("click", function(){
    consulta=JSON.parse(localStorage.getItem("pokemon19"));
    console.log(consulta)
    ampPoke(consulta,ver)})
