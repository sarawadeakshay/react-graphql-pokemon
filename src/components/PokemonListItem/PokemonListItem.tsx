import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../types/Pokemon';
import { useNavigate } from 'react-router-dom';

export const PokemonListItem = (props: { pokemon: Pokemon }) => {
  const poke = props.pokemon;
  const classes = useStyles();

  const navigate = useNavigate();

  const onSelectPokemon = (pokeId: string, pokeName: string) => {
    navigate(`/pokemon/${pokeId}/${pokeName}`);
  }

  return (
    <li key={poke.id} className={classes.root} onClick={() => onSelectPokemon(poke.id, poke.name)}>
      <div className={classes['img-container']}>
        <img key={`${poke.id}-${poke.image}`} className={classes.img} src={poke.image} alt={poke.name} />
      </div>
      <div key={`${poke.id}-${poke.number}`}>{poke.number}</div>
      <div key={`${poke.id}-${poke.name}`} className={classes['poke-name']}>{poke.name}</div>
      <div className={classes['poke-types']}>
        {poke.types.map((type) => <div key={`${poke.id}-${type}`} className={classes['poke-types-span']}>{type}</div>)}
      </div>
    </li>);
};

const useStyles = createUseStyles(
  {
    root: {
      width: '300px',
      height: '310px',
      display: 'inline-block',
      margin: '10px',
      background: '#fff',
      padding: '10px',
      'border-radius': '5px',
      'box-sizing': 'border-box',
      cursor: 'pointer',
      color: '#a5a3a3',
      '&:hover': {
        backgroundColor: '#cbc6c6',
      },
    },
    'img-container': {
      display: 'flex',
      'justify-content': 'center',
    },
    img: {
      width: '180px',
      height: '160px',
      background: '#fff',
      // border: '1px solid #f2f2f2',
      border: '1px solid #fff',
      'border-radius': '10px',
      padding: '15px',
      // '&:hover': {
      //   backgroundColor: '#30a7d7',
      // },
    },
    'poke-name': {
      color: '#3f3b3b',
      'font-size': '24px',
      'font-weight': 500,
    },
    'poke-types': {
      'justify-content': 'flex-start',
      display: 'flex',
    },
    'poke-types-span': {
      margin: '5px',
      border: '1px solid gray',
      'border-radius': '5px',
      padding: '5px 10px',
      '&:first-child': {
        marginLeft: 0,
      }
    },
  },
  { name: 'PokemonListItem' }
);
