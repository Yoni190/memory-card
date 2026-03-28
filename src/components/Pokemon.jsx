import React from 'react'
import '../styles/style.css'

const Pokemon = ({ pokemons }) => {
  return (
    <div className='poke-container'>
        {pokemons?.map((poke, index) => (
          <div key={index} className='poke'>
            <img src={poke?.sprites?.front_default} alt="" />
            <h1 className='poke-name'>{(poke?.forms[0].name).toUpperCase()}</h1>
         </div>
        ))}
    </div>
  )
}

export default Pokemon