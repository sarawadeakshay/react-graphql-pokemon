import * as React from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { createUseStyles } from 'react-jss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const Modal = () => {
  const [open, setOpen] = React.useState(true);
  const { id, name } = useParams();
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemon(id || '', name || '');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <h1>{name}</h1>
      {loading
        ? <h2>Fetching details of {name}...</h2>
        : <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open Dialog
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {name}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className={classes.container}>
              <div className={classes['img-container']}>
                <img key={`${pokemon.id}-${pokemon.image}`} className={classes.img} src={pokemon.image} alt={pokemon.name} />
              </div>
              <div key={`${pokemon.id}-${pokemon.number}`}>
                <span className={classes['label-str']}>Number: </span>
                {pokemon.number}
              </div>
              <div key={`${pokemon.id}-${pokemon.classification}`}>
                <span className={classes['label-str']}>Classification: </span>
                {pokemon.classification}
              </div>
              <div className={classes['poke-types']}>
                <span className={classes.label}>Weaknesses: </span>
                {pokemon.weaknesses.map((weakness) => <div key={`${pokemon.id}-${weakness}`} className={classes['poke-types-span']}>{weakness}</div>)}
              </div>
              <div className={classes['poke-types']}>
                <span className={classes.label}>Types: </span>
                {pokemon.types.map((type) => <div key={`${pokemon.id}-${type}`} className={classes['poke-types-span']}>{type}</div>)}
              </div>
              <div className={classes['poke-types']}>
                <span className={classes.label}>Resistant: </span>
                {pokemon.resistant.map((res) => <div key={`${pokemon.id}-${res}`} className={classes['poke-types-span']}>{res}</div>)}
              </div>
              <div className={classes['poke-types']}>
                <span className={classes.label}>Weakness: </span>
                {pokemon.weaknesses.map((weakness) => <div key={`${pokemon.id}-${weakness}`} className={classes['poke-types-span']}>{weakness}</div>)}
              </div>
            </div>
          </DialogContent>
        </BootstrapDialog>
      </>}
    </div>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      margin: '40px',
    },
    container: {
      background: '#cbc6c6',
      width: '520px',
      padding: '20px',
    },
    'img-container': {
      display: 'flex',
      'justify-content': 'center',
    },
    img: {
      width: '280px',
      height: '250px',
      // background: '#f2f2f2',
      background: '#fff',
      border: '1px solid #f2f2f2',
      'border-radius': '10px',
      padding: '10px',
      margin: '10px',
      // backgroundColor: '#30a7d7',
    },
    'label-str': {
      fontWeight: 'bold',
      paddingBottom: '5px',
      width: '110px',
      display: 'inline-block',
    },
    label: {
      fontWeight: 'bold',
      paddingTop: '10px',
      paddingRight: '5px',
      width: '100px',
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
    }
  },
  { name: 'PokemonModal' }
);