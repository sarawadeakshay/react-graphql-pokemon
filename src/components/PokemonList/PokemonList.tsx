import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonListItem } from '../PokemonListItem/PokemonListItem';
import { Search } from '../Search';
import { Pokemon } from '../../types/Pokemon';

export const PokemonList = () => {
  const classes = useStyles();
  const [searchStr, setSearchStr] = useState('');
  const { pokemons, loading } = useGetPokemons();
  const [pokemonsArr, setPokemonsArr] = useState(pokemons);

  // Save the pokemon data in a state variable
  // This state variable is used to apply search filter
  useEffect(() => {
    if (pokemons) {
      setPokemonsArr(pokemons);
    }
  }, [pokemons]);

  // Search string handler
  const onSearch = () => {
    console.log('searchStr: ', searchStr);
    const filteredPokemons = pokemons.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(searchStr.toLowerCase())
    );
    setPokemonsArr(filteredPokemons);
  };

  return (
    <div className={classes.root}>
      {loading
        ? <div>Loading...</div>
        : <>
            <Search
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            onSearch={onSearch} /><ul className={classes.ul}>
              {pokemonsArr.map((pkmn) => (
                <span key={pkmn.id}>
                  <PokemonListItem pokemon={pkmn} />
                </span>
              )
              )}
            </ul>
          </>
      }
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      textAlign: 'left',
      padding: '32px',
      boxSizing: 'border-box',
    },
    ul: {
      'list-style-type': 'none',
    }
  },
  { name: 'PokemonList' }
);
