import React from 'react'

const Pokemon = ({ pokemons }) => {
  return (
    <div>
        {pokemons?.map((poke, index) => (
          <div key={index}>
            <img src={poke?.sprites?.front_default} alt="" />
            <h1>{(poke?.forms[0].name).toUpperCase()}</h1>
         </div>
        ))}
    </div>
  )
}

export default Pokemon