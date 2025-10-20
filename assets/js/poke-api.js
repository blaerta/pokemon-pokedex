const pokeApi = {};

function convertPokeApiDetailtoPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height / 10;
    pokemon.weight = pokeDetail.weight / 10;
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    pokemon.stats = pokeDetail.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
    }));
    pokemon.moves = pokeDetail.moves.map((move) => move.move.name);

    return pokemon;
}

function convertSpeciesDetailtoPokemon(speciesDetail) {
    console.log('Raw Species Data with gender_rate:', speciesDetail.gender_rate);
    const genderRate = speciesDetail.gender_rate;
    let genderInfo = 'Genderless';
        if (genderRate >= 0) {
            const femaleRatio = (genderRate / 8) * 100;
            const maleRatio = 100 - femaleRatio;
            genderInfo = `Gender: ${maleRatio}% ♂, ${femaleRatio}% ♀`;
            if(genderRate > 8 || genderRate < 0 || (genderRate === 1 && speciesDetail.name !== 'dratini' && speciesDetail.name !== 'dragonair')) {
                console.warn(`Suspicious gender_rate ${genderRate} for ${speciesDetail.name}, may be incorrect.`);
                genderWarning = true;
            }
            genderInfo = `Gender: ${maleRatio}% ♂, ${femaleRatio}% ♀`;
        }
        const eggGroups = speciesDetail.egg_groups.map(group => group.name). join(', ');
        const eggCycles = speciesDetail.hatch_counter + 1;

        return { genderInfo, genderWarning, eggGroups, eggCycles, evolution_chain: speciesDetail.evolution_chain };
}

function convertEvolutionChainDetailtoTree(evolutionChain) {
    const getEvolutionChain = (chain) => {
        const evolution = {
            species_name: chain.species.name,
            evolves_to: chain.evolves_to.map(getEvolutionChain),
        };
        return evolution;
    };
    return getEvolutionChain(evolutionChain.chain);
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => {
            if(!response.ok) throw new Error (`Falhou em buscar os detalhes para ${pokemon.name}`);
            return response.json()
    })
    .then(convertPokeApiDetailtoPokemon)
    .catch((error) => {
        console.error(error);
        return null;
    });
};

pokeApi.getPokemonSpecies = (pokemonId) => {
    const url =`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    console.log('Fetching Species URL:', url);
    return fetch(url)
    .then((response) => {
        if (!response.ok) throw new Error (`Falhou em buscar os dados da espécie para ID ${pokemonId}`);
        return response.json();
    })
    .then(convertSpeciesDetailtoPokemon)
    .catch((error) => {
        console.error(error);
        return { genderInfo: 'Unknown', eggGroups: 'Unknown', eggCycles: 'Unknown', evolution_chain: { url: ''} };
    });
};

pokeApi.getEvolutionChain = (url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error(`Falhou em buscar a cadeia de evolução.`);
            return response.json();
        })
        .then(convertEvolutionChainDetailtoTree)
        .catch((error) => {
            console.error(error);
            return { species_name: 'Unknown', evolves_to: [] };
        });
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

return fetch(url)
    .then((response) => {
        if (!response.ok) throw new Error ('Falhou em buscar a lista de Pokémons.');
        return response.json();
    })

    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => {
        console.error('Erro ao buscar Pokémons.', error);
        return [];
    });
};