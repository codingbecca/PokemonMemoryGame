import { useState, useEffect } from "react";
import { fetchPokemon } from "../api.js";
import Card from "./card";
import EndScreen from "./EndScreen.jsx";

export default function Game({score, setScore, highScore, setHighScore}){
    const [pokemonList, setPokemonList] = useState([]);
    const [moves, setMoves] = useState([]);
    const [win, setWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const newGame = async () => {
        try {
            setGameOver(false);
            setWin(false);
            setScore(0);
            setMoves([]);
            //generate 9 random pokemon ids between 1 and 1025
            let set = new Set()
            while (set.size < 9 ){
                set.add(Math.floor(Math.random()*1025)+1);
            }
            let pokemonIds = [...set];
    
            //fetch a pokemon for each Id and add it's image and name to the pokemon state arrary
            const promises = pokemonIds.map(async(id) => {
                const pokemon = await fetchPokemon(id);
                return { id: id, name: pokemon.forms[0].name, img: pokemon.sprites.front_default };
            });
    
            //Wait for all promises to resolve
            const newPokemon = await Promise.all(promises);
            
            //update pokemonList state with newPokemon
            setPokemonList(newPokemon);
        } catch (error) {
            console.log(error);
        }
    }

    const shuffleArray = (array) =>{
        return array.toSorted(() => Math.random() - 0.5);
    }

    const handleClick = (id) => {
        if (moves.length > 0 && moves.includes(id)){
            setMoves([]);
            setWin(false);
            setGameOver(true);
            return;
        }

        let newMoves = [...moves, id];

        if (newMoves.length === pokemonList.length) {
            setWin(true);
            setGameOver(true);
        }

        if(newMoves.length > highScore) {
            setHighScore(newMoves.length);
        }
        setMoves(newMoves);
        setScore(score + 1);
        setPokemonList(shuffleArray(pokemonList));
    }

    useEffect(() => {
        newGame()
    }, [])

    if(gameOver) {
        return (
            <EndScreen win={win} newGame={newGame} />
        )
    }

    return (
        <div className='game'>
            <h1>Pokemon Memory Game</h1>
            <div className='cards'>
                {pokemonList.map((pokemon) =>
                    <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} img={pokemon.img} handleClick={handleClick} />
                )}
            </div>
                
        </div>
    )
}