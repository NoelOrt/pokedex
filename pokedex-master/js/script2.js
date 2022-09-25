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
let selection=0
let consulta=0
function setPokemonCard(num, pokemon){
    var pokeid=localStorage.getItem("pokeid");
    console.log('pasa por setpoke',pokeid)
    var id=document.getElementById(`pokemon_id${num}`)
    var image = document.getElementById(`pokemon_img${num}`)
    var name = document.getElementById(`pokemon_name${num}`)
    var attack = document.getElementById(`pokemon_height${num}`)
    var defenses = document.getElementById(`pokemon_weight${num}`)
    var abilities = document.getElementById(`pokemon_abilities${num}`)
    image.setAttribute("src", pokemon.sprites.front_default)
    id.innerText='ID='+num
    name.innerText =  pokemon.name
    attack.innerText =  pokemon.stats[1].base_stat
    defenses.innerText =  pokemon.stats[2].base_stat
    abilities.innerText =  pokemon.abilities.length
    if (pokeid==1){localStorage.setItem("pokemon1", JSON.stringify(pokemon));
    console.log(pokemon)}
    else{localStorage.setItem("pokemon2", JSON.stringify(pokemon));
    console.log(pokemon)}
    defensa=pokemon.stats[2].base_stat
    botText()
    if(selection==2){saltButton()}
    
}



function consultarPokemon(num){      
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then( function(response){
        response.json()
        .then(function (pokemon){
            setPokemonCard(num, pokemon)
           
        
        })
        
    })

}
function inicio(ids){
    var pokeid=localStorage.getItem("pokeid");
    console.log('pasa por inicio',pokeid)
    var image = document.getElementById(`pokemon_img${ids}`)
    console.log(image)
    var id=document.getElementById(`pokemon_id${ids}`)
    var name = document.getElementById(`pokemon_name${ids}`)
    var attack = document.getElementById(`pokemon_height${ids}`)
    var defenses = document.getElementById(`pokemon_weight${ids}`)
    var abilities = document.getElementById(`pokemon_abilities${ids}`)
    var img='img/inte.png'
    var vacio=''
    image.setAttribute("src", img)
    id.innerText= vacio
    name.innerText =  vacio
    attack.innerText =  vacio
    defenses.innerText =  vacio
    abilities.innerText =  vacio
    
}

function criaCardPokemon(id){
    var card = `
        <div class="img_card">
            <img id="pokemon_img${id}" src="">
        </div>

        <p class="pokemon_id" id="pokemon_id${id}"></p>
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


const timer = ms => new Promise(res => setTimeout(res, ms))
async function gerarCards(id = 1){
    if(cartas==0){
        
        if(id < 3){
            var panel = document.getElementsByClassName("panelB")[0]
            var a=0
            var b=10
        for(var i = id; i<id+10; i++){
            let ids = Math.floor(Math.random() * 800) + 1;
            localStorage.setItem('ids'+(i+10),ids)
            console.log(ids)
            var card = document.createElement("div")
            card.className = "pokemon_card"
            card.id="pokemon_card"+a
            card.innerHTML = criaCardPokemon(ids)
            panel.appendChild(card)
            a++
            b++
            inicio(ids)
            
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
        var panel = document.getElementById("panelCon")
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
    if(selection==2) butBat.innerHTML = 'Batalla!'; 
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
        resumen.innerText= pokemon1.name+'ataca y pierde contra '+pokemon2.name;
    }
    else if(pokemon1.stats[1].base_stat>pokemon2.stats[2].base_stat){
        localStorage.setItem("win", 1);
        win=1;
        console.log(win)
        console.log(cartas)
        console.log('gana izq')
        resumen.innerText=pokemon1.name+' '+' ataca y empata contra '+' '+ pokemon2.name;

    }
    else{
        localStorage.setItem("win", 3);
        win=3;
        console.log(win)
        console.log(cartas)
        console.log('empate')
        resumen.innerText= pokemon1.name+' '+' ataca y empata contra '+' '+pokemon2.name;
        
    }
    
    return win;
    
}
function cantSel(consulta, ver){
  
    if(selection<2){
        selection++
        localStorage.setItem('pokeid',selection)
        console.log(selection)
        consultarPokemon(consulta,ver)
        
    }
   
    
    
}
function saltButton(){
    var pokemon1=JSON.parse(localStorage.getItem("pokemon1"));
    var pokemon2=JSON.parse(localStorage.getItem("pokemon2"));
    console.log(pokemon1, pokemon2)
    console.log ('pulsado2');
    batalla()
    cartas=3
    selection+=
    botText()
    gerarCards()
    console.log(cartas)
    return
}

if(cartas===0){
    botText()
    gerarCards()
    console.log(cartas)
    
}
document.getElementById("battleButton").addEventListener("click", function(){

    if (selection==2){
    var pokemon1=JSON.parse(localStorage.getItem("pokemon1"));
    var pokemon2=JSON.parse(localStorage.getItem("pokemon2"));
    console.log(pokemon1, pokemon2)
    console.log ('pulsado2');
    batalla()
    cartas=3
    selection+=
    botText()
    gerarCards()
    console.log(cartas)
    return
    }
    if (cartas==3){
    console.log ('reset');
    localStorage.removeItem("pokemon1");
    localStorage.removeItem("pokemon2");
    localStorage.removeItem("win");
    cartas=0;
    location.reload();
    }


})

let ver
document.getElementById("pokemon_card0").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids11"))){
    consulta=JSON.parse(localStorage.getItem("ids11"));
    console.log(consulta)
    ver=1
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card1").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids12"))){
    consulta=JSON.parse(localStorage.getItem("ids12"));
    console.log(consulta)
    ver=2
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card2").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids13"))){
    consulta=JSON.parse(localStorage.getItem("ids13"));
    console.log(consulta)
    ver=3
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card3").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids14"))){
    consulta=JSON.parse(localStorage.getItem("ids14"));
    console.log(consulta)
    ver=4
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card4").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids15"))){
    consulta=JSON.parse(localStorage.getItem("ids15"));
    console.log(consulta)
    ver=5
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card5").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids16"))){
    consulta=JSON.parse(localStorage.getItem("ids16"));
    console.log(consulta)
    ver=6
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card6").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids17"))){
    consulta=JSON.parse(localStorage.getItem("ids17"));
    console.log(consulta)
    ver=7
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card7").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids18"))){
    consulta=JSON.parse(localStorage.getItem("ids18"));
    console.log(consulta)
    ver=8
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card8").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids19"))){
    consulta=JSON.parse(localStorage.getItem("ids19"));
    console.log(consulta)
    ver=9
    cantSel(consulta,ver)}})
document.getElementById("pokemon_card9").addEventListener("click", function(){
    if(consulta!=JSON.parse(localStorage.getItem("ids20"))){
    consulta=JSON.parse(localStorage.getItem("ids20"));
    console.log(consulta)
    ver=10
    cantSel(consulta,ver)}})
    
