export const fetchPokemon = async (id) => {
    try {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (result.ok) {
            const pokemon = await result.json();
            return pokemon;
        }

        throw new Error('Error fetching data from API');
        
    } catch (error) {
        console.log(error);
    }

}