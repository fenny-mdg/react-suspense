// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
  PokemonInfoFallback,
} from '../pokemon'
import {createResource} from 'utils'

// let pokemon
// let error

// let pokemonPromise = fetchPokemon('pikacha').then(
//   p => (pokemon = p),
//   e => (error = e),
// )

const resource = createResource(fetchPokemon('pikachu'))

// function createResource(promise) {
//   let status = 'pending'
//   let result = promise.then(
//     resolved => {
//       status = 'resolved'
//       result = resolved
//     },
//     rejected => {
//       status = 'rejected'
//       result = rejected
//     },
//   )
//   return {
//     read() {
//       if (status === 'pending') {
//         throw result
//       }
//       if (status === 'rejected') {
//         throw result
//       }
//       if (status === 'resolved') {
//         return result
//       }
//     },
//   }
// }

function PokemonInfo() {
  const pokemon = resource.read()

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<PokemonInfoFallback />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
