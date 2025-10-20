document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded in main.js');

const pokemonList = document.getElementById('pokemonList');
    console.log('pokemonList in main.js:', pokemonList);

        if (!pokemonList){
        console.error('pokemonList not found in DOM in main.js');
        return;
}

const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit){
    console.log ('Loading items with offset:', offset);

    return pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log('Pokémons received:', pokemons);

            if (pokemons.length === 0) {
                console.error('No Pokémon data received from API');
                return [];
            }
            
    const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}">
                    <span class="number"> #${pokemon.number} </span>
                    <span class="name"> ${pokemon.name} </span>
                    
                    <div class="detail">
                        <ol class="types"> 
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
    `).join('');
    pokemonList.innerHTML += newHtml;
        return pokemons;
});
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
    loadPokemonItems(offset, limit);
    }
});
});