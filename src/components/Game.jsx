import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon'

const Game = () => {

  const [pokeData, setPokeData] = useState([])


  const pokemons = ['ditto', 'pikachu', 'charizard', 'bulbasaur', 'eevee', 'jigglypuff', 'mew', 'dragonite', 'squirtle', 'gardevoir']

  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const [clicked, setClicked] = useState([])
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

    
  }, [])


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

  const handleClick = (id) => {
    shuffleArray()
    
    if(clicked.includes(id)) {
      if(clicked.length > highScore) {
        setHighScore(clicked.length)
      }
      setCurrentScore(0)
      setClicked([])
    } else {
      setClicked([...clicked, id])
      setCurrentScore(currentScore + 1)
    }
    
  }
  
  return (
    <div>
        <header>
            <div>
              <h1>Memory Card</h1>
              <small>Don't click on the pictures more than once</small>
            </div>

            <div className='scores'>
              <p>Current Score: {currentScore}</p>
              <p>High Score: {highScore}</p>
            </div>
        </header>


        <Pokemon pokemons={pokeData} handleClick={handleClick}/>
        
    </div>
  )
}

export default Game