const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("pokemon-gen");
const typeColor = {
    bug: "#8DC000",
    dragon: "#7B00C1",
    electric: "#FAFA27",
    fairy: "#FCC2DF",
    fighting: "#B30000",
    fire: "#FF9317",
    flying: "#B096BC",
    grass: "#00B235",
    ground: "#D5C660",
    ghost: "#685A87",
    ice: "#88E9F3",
    normal: "#B7A68F",
    poison: "#9557A1",
    psychic: "#FA7DBC",
    rock: "#A69B4F",
    water: "#374EE6",
    dark: "#624F21",
    steel: "#A5A5A5"
};

let getPokeData = () => {
    let id = Math.floor(Math.random() * 649) + 1;
    const finalUrl = url + id;

    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => { 
            generatePokemon(data);
        });
};

let generatePokemon = (data) => {
    console.log(data);
    let name = "";
    let imgSrc = "";
    // Shiny roll
    let shiny = Math.floor(Math.random() * 10) + 1;
    if (shiny == 1) {
        name = "Shiny " + capitalizeFirstLetter(data.name);
        imgSrc = data.sprites.other["official-artwork"].front_shiny;
    } else {
        name = data.name;
        imgSrc = data.sprites.other.dream_world.front_default;
    }

    card.innerHTML = 
    `<div class="pokemon-img">
        <img src=${imgSrc}>
    </div>
    <div class="poke-name">A wild <a class="name">${capitalizeFirstLetter(name)}</a> appeared!</div>`;

    // Set theme color
    const themeColor = typeColor[data.types[0].type.name];
    const pokeName = document.querySelector(".poke-name a");
    pokeName.style.color = `${themeColor}`;

};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);

function capitalizeFirstLetter(string) {
    return string.replace(/^./, string[0].toUpperCase());
}