// JavaScript
const divElement = document.querySelector("#box-container");
const btnElement = document.querySelector("#btn");
const inputElement = document.querySelector("#input");
let pokemonNames = [];

async function fetchPokemonNames() {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
    const response = await fetch(URL);
    const data = await response.json();
    pokemonNames = data.results.map((pokemon) => pokemon.name);
  } catch (error) {
    console.error("Erro ao buscar os nomes dos Pokémon:", error);
  }
}

async function getPokemonDetails(pokemonName) {
  try {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(URL);
    const data = await response.json();
    const name = data.name;
    const img = data.sprites.other.dream_world.front_default;
    const abilities = data.abilities.map((ability) => ability.ability.name);

    divElement.innerHTML = "";

    const imgElement = document.createElement("img");
    imgElement.src = img;
    imgElement.alt = name;
    divElement.appendChild(imgElement);

    const nameElement = document.createElement("h2");
    nameElement.textContent = name;
    divElement.appendChild(nameElement);

    const olElement = document.createElement("ol");

    abilities.forEach((abilityName) => {
      const liElement = document.createElement("li");
      liElement.textContent = ` Abilidades: ${abilityName}`;
      olElement.appendChild(liElement);
    });

    divElement.appendChild(olElement);

    console.log(data);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

btnElement.addEventListener("click", () => {
  const selectedPokemon = inputElement.value.toLowerCase();
  if (pokemonNames.includes(selectedPokemon)) {
    getPokemonDetails(selectedPokemon);
  } else {
    alert("Pokemon não encontrado. Por favor, digite um nome válido.");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await fetchPokemonNames();
  new Awesomplete(inputElement, {
    list: pokemonNames,
    filter: Awesomplete.FILTER_STARTSWITH,
    sort: false,
    item: function (text, input) {
      return Awesomplete.ITEM(text, input);
    },
  });

  inputElement.addEventListener("awesomplete-selectcomplete", function (event) {
    const selectedPokemon = event.text.value.toLowerCase();
    getPokemonDetails(selectedPokemon);
  });
});
