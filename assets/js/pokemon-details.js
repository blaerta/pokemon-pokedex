document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded in pokemon-details.js');

const pokemonList = document.getElementById('pokemonList');
    console.log('pokemonList in pokemon-details.js:', pokemonList);
        if (!pokemonList){
        console.error('pokemonList no found in the DOM in pokemon-details.js');
        return;
}

const pokemonDetail = document.getElementById('pokemonDetail');
const detailContent = document.getElementById('detail-content');
const backButton = document.getElementById('backButton');

async function showPokemonDetail(pokemon) {
    pokemonDetail.classList.remove('hidden');
    pokemonList.style.display = 'none';


    const speciesData = await pokeApi.getPokemonSpecies(pokemon.number);
    console.log('Species Data:', speciesData);
    console.log('Gender Warning Status: ', speciesData.genderWarning);
    const evolutionChain = await pokeApi.getEvolutionChain(speciesData.evolution_chain.url || `https://pokeapi.co/api/v2/evolution-chain/${pokemon.number}/`);
    console.log('Evolution Chain Data:', evolutionChain);

    const typeColor = {
        normal: '#a6a877',
        grass: '#77c850',
        poison: '#a040a0',
        fire: '#ee7f30',
        water: '#678fee',
        electric: '#f7cf2e',
        ice: '#98d5d7',
        ground: '#dfbf69',
        flying: '#a98ff0',
        poison: '#a040a0',
        fighting: '#bf3029',
        psychic: '#f65687',
        dark: '#725847',
        rock: '#b8a137',
        bug: '#a8b720',
        ghost: '#6e5896',
        steel: '#b9b7cf',
        dragon: '#6f38f6',
        fairy: '#f9aec7',
    }[pokemon.type] || '#fff';

    const renderEvolutionTree = (evolution) => {
        return `
            <div class="evolution-node">
                <span>${evolution.species_name}</span>
                ${evolution.evolves_to.length > 0 ? ` → ${evolution.evolves_to.map(renderEvolutionTree).join(' → ')}` : ''}
            </div>
        `.trim();
    };

    const HTML = `
    <div class="detail-card" style="background-color: ${typeColor}">
            <h2>${pokemon.name} <span>#${pokemon.number}</span></h2>
            <div class="type-tags">
                ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
            </div>
            <img src="${pokemon.photo}" alt="${pokemon.name}" class="detail-image">
            <div class="tabs">
                <button class="tab active" data-tab="about">About</button>
                <button class="tab" data-tab="stats">Base Stats</button>
                <button class="tab" data-tab="evolution">Evolution</button>
                <button class="tab" data-tab="moves">Moves</button>
            </div>
            <div id="tabContent" class="tab-content">
                <!-- About Tab -->
                <div class="tab-panel" data-tab="about">
                    <p><strong>Height:</strong> ${pokemon.height} m</p>
                    <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
                    <p><strong>Abilities:</strong> ${pokemon.abilities.join(', ')}</p>
                    <p><strong>Gender:</strong> ${speciesData.genderInfo} ${speciesData.genderWarning ? '<span class="gender-warning">[Warning: Gender data may be inaccurate due to API issue.]</span>' : ''}</p>
                    <p><strong>Breeding:</strong> Egg Groups: ${speciesData.eggGroups}, Egg Cycles: ${speciesData.eggCycles}</p>
                </div>
                <!-- Base Stats Tab -->
                <div class="tab-panel hidden" data-tab="stats">
                    ${pokemon.stats.map((stat) => `
                        <p><strong>${stat.name.replace('-', ' ')}:</strong> ${stat.value} <div class="stat-bar" style="width: ${stat.value / 1.5}%;"></div></p>
                    `).join('')}
                    <p><strong>Total:</strong> ${pokemon.stats.reduce((sum, stat) => sum + stat.value, 0)}</p>
                </div>
                <!-- Evolution Tab (Placeholder) -->
                <div class="tab-panel hidden" data-tab="evolution">
                    <h3>Evolution Chain</h3>
                        <div class="evolution-tree">
                            ${renderEvolutionTree(evolutionChain)}
                        </div>
                </div>
                <!-- Moves Tab -->
                <div class="tab-panel hidden" data-tab="moves">
                    <p><strong>Moves:</strong> ${pokemon.moves.join(', ')}</p>
                </div>
            </div>
        </div>
    `;

console.log('Rendered HTML:', HTML);    
detailContent.innerHTML = HTML;

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
        document.querySelector(`.tab-panel[data-tab="${tab.dataset.tab}"]`).classList.remove('hidden');
    });
});
}

pokemonList.addEventListener('click', (e) => {
        console.log('Click detected on pokemonList');
            const li = e.target.closest('li.pokemon');
                if(li) {
                    console.log('Found li.pokemon:', li);
                    const pokemonName = li.querySelector('.name').textContent.trim();
                    console.log('Trimmed Pokémon name:', pokemonName);
                    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`; 


                    pokeApi.getPokemonDetail({url: pokemonUrl}).then((pokemon) => {
                        console.log('Fetched Pokémon Details:', pokemon);
                        
                        if (pokemon) {
                            showPokemonDetail(pokemon);
                        } else {
                            console.log ('No Pokémon details found for name: ', pokemonName);
                        }
        }).catch((error) => {
            console.error('Error fetching pokemons for click:', error);
        });
    } else {
        console.log('No li.pokemon found for click target');
    }
});

backButton.addEventListener('click', () => {
    pokemonDetail.classList.add('hidden');
    pokemonList.style.display = 'grid';
});
});