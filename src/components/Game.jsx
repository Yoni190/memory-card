import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon'

const Game = () => {

  const [pokeData, setPokeData] = useState([])
  
  const [pokemons, setPokemons] = useState(
      ['ditto', 'pikachu', 'charizard', 'bulbasaur', 'eevee', 'jigglypuff', 'mew', 'dragonite', 'squirtle', 'gardevoir']
  )
  const API_URL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    let isMounted = true

    const fetchPokes = async() => {
      try {
        pokemons.forEach(async (pokemon) => {
          const res = await axios.get(`${API_URL}/${pokemon}`)
          
          if(isMounted) {
            setPokeData(pokeData => [...pokeData, res.data])
          }
          
        })
      } catch (error) {
        console.log(error)
      }
      
    }

    fetchPokes()


    return () => {
      isMounted = false
    }

    
  }, [pokemons])


  const shuffleArray = () => {
    let currentIndex = pokeData.length
    const temp = [...pokeData]

    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      [temp[currentIndex], temp[randomIndex]] = [temp[randomIndex], temp[currentIndex]]
    }

    setPokeData(temp)
  }

  const handleClick = () => {
    shuffleArray()
    console.log(pokemons)
  }
  
  return (
    <div>
        <header>
            <h1>Memory Card</h1>
            <small>Don't click on the pictures more than once</small>
        </header>


        <Pokemon pokemons={pokeData} handleClick={handleClick}/>
        
    </div>
  )
}

export default Game