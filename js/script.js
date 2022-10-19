/*
comentari: ús de localStorage vs sessionStorage

localStorage és persistent, i les dades queden guardades a no ser que s'eliminin manualment netejant dades de navegació
o creant una funció específica per eliminar-les. És útil en casos com per exemple, guardar les preferències del theme dark/light
perquè l'usuari ho seleccioni, i quan torni a entrar a la web un altre dia li conservi la selecció.

sessionStorage és temporal. Les dades es borren al tancar el navegador. És útil per guardar dades temporals que ens interessen
mentre utilitzem l'aplicació, però que no té sentit guardarles de manera permanent. Per exemple, guardar el llistat de pokemons,
tindria més sentit guardar-lo forma temporal i que s'esborri al tancar el navegador, ja que quan es torni a entrar
es carregaran de nou.

localStorage i sessionStorage s'utilitzen exactament igual, només canvia el nom (i el comportament)
*/


/*
    var initUrl=new URL(window.location);
    console.log(initUrl.search)
    const onlyNumbers = initUrl.search.replace(/[^0-9]+/g, "");
    console.log(onlyNumbers)

if(onlyNumbers>0){
    ver=1
    verPoke(onlyNumbers)
    var del=getElementsByClassName('pokemon_card')
    //del.remove()
}
*/
var ver=0
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

const timer = ms => new Promise(res => setTimeout(res, ms))
function setPokemonCard(rand, pokemon,b){
    if(ver==0){
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
    else{
        console.log(pokemon)
    localStorage.setItem("pokemon"+b, JSON.stringify(pokemon));
    var nTypes=pokemon.types.length
    var types
    for(var i=0; i<nTypes;i++){
        console.log('valor'+i)
        console.log(nTypes)
        let varname= "var"+i
        let varname1= "varr"+i
        console.log('valor'+i)
        window[varname] = document.getElementById(`pokemon_types${i}${rand}`)
        window[varname1] = document.getElementById(`pokemon_type${i}${rand}`)
        console.log(rand)
        window[varname].innerText = pokemon.types[i].type.name
        window[varname1].innerText = 'type '+i
       
       
    }
    for(var j=nTypes;j<3;j++){
        var element=document.getElementById(`attribute`+j)
        element.remove()
    }
    console.log(var0)
    console.log(nTypes)
    var image = document.getElementById(`pokemon_img${rand}`)
    var image2 = document.getElementById(`pokemon_img2${rand}`)
    var name = document.getElementById(`pokemon_name${rand}`)
    var attack = document.getElementById(`pokemon_attack${rand}`)
    var defenses = document.getElementById(`pokemon_defenses${rand}`)
    image.setAttribute("src", pokemon.sprites.front_default)
    image2.setAttribute("src", pokemon.sprites.back_default)
    name.innerText =  pokemon.name
    attack.innerText =  pokemon.stats[1].base_stat
    defenses.innerText =  pokemon.stats[2].base_stat
   
    }
 return   
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
function borrar(){
    var txt=document.getElementById("Busca")
    txt.value=''
    for (var i = 0; i < 10; i++) {
        var n= i+10;
        
        document.getElementById('pokemon_card'+i).style.display = '';
    }


}

function search(){
    console.log('a entrado en busqueda')
    var txt=document.getElementById("Busca").value
    console.log(txt)
    let card=[]
    let coincide=[]
    for (var i = 0; i < 10; i++) {
        var n= i+10;
        
        card[i]=JSON.parse(localStorage.getItem("pokemon"+n));
        //console.log(card[i].name)
     }
    for(var j=0;j<10;j++){
        coincide[j] = card[j].name.indexOf(txt);
        //console.log(coincide)
    }
    for(var k=0;k<10;k++){
        if(coincide[k]==0){
            console.log('pokemon_card'+k)
        document.getElementById('pokemon_card'+k).style.display = '';}
        else{document.getElementById('pokemon_card'+k).style.display = 'none';}
    }

    

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
function criaCardPokemon2(id){
    var card = `
        <div class="img_card">
            <img id="pokemon_img${id}" src="">
            <img id="pokemon_img2${id}" src="">

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
                <p class="pokemon_types" id="pokemon_types0${id}"></p>
                <p id="pokemon_type0${id}"></p>
            </div>
            <div class="attribute" id="attribute1">
                <p class="pokemon_types" id="pokemon_types1${id}"></p>
                <p id="pokemon_type1${id}"></p>
            </div>
            <div class="attribute" id="attribute2">
                <p class="pokemon_types" id="pokemon_types2${id}"></p>
                <p id="pokemon_type2${id}"></p>
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
function borrarCard3(){
    var panel = document.getElementsByClassName("pokemon_card3")[0]
    panel.remove()
    ver=0
    // comentari: si la funció no retorna cap valor no és necessari posar un return
    return
}

function verPoke(consulta){
    rand=consulta;
    console.log(rand)
    var panel = document.getElementById("panelCon")
    var card = document.createElement("div")  
    card.className="pokemon_card"+3
    card.innerHTML = criaCardPokemon2(rand)
    consultarPokemon(rand)
    console.log(card)
    panel.appendChild(card)
    console.log('verpoke')
    ver=5
    localStorage.setItem('ver',ver)
    console.log(ver)
    actualizarurl(rand)
    return
}

function actualizarurl(rand){
    const url = new URL(window.location);
    localStorage.setItem("url",url);
    url.searchParams.set('pokeID', rand);
    window.history.pushState({}, '', url)}
    

function ampPoke(consulta,ver){
    if(ver==0){verPoke(consulta.id)}
    else{
        var url=localStorage.getItem("url")
        window.history.pushState('', '', url)
        borrarCard3()
    }
    
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


    /* comentari: enlloc de crear a ma un event listener per cada carta, les pots consultar totes de cop i aplicar un event listener amb un forEach,
    i només caldria obtenir el seu número del id i afegir-lo a "pokemon1" per obtenir-lo de localStorage
    per exemple:
    pokemon_card2 -> es separa en "pokemon_card" i "2" -> es fa getItem de "pokemon1"+"2" que es converteix en getItem de "pokemon12"

    const pokes = document.querySelectorAll('.pokemon_card')

    pokes.forEach( poke => poke.addEventListener("click", function(){
        
        let temp = poke.id.split("pokemon_card");     
        console.dir(temp);
        console.log(`id: ${poke.id} , num id: ${temp[1]}`);
        let numId = temp[1]
        consulta=JSON.parse(localStorage.getItem("pokemon1"+numId));
        console.log(consulta)
        ampPoke(consulta,ver)
        })
    )

    */