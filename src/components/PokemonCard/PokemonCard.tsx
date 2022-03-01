import React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import { HeartBroken } from '@mui/icons-material';

import { makeStyles } from '@/styles/makeStyles';

import Text from '../Text';

const POKEMON_CARD_SIZE = 150;

const useStyles = makeStyles()((theme) => ({
  pokemonCard: {
    position: 'relative',
    minWidth: POKEMON_CARD_SIZE,
    maxWidth: POKEMON_CARD_SIZE,
    minHeight: POKEMON_CARD_SIZE,
    maxHeight: POKEMON_CARD_SIZE,
    borderRadius: 4,
    border: '1px solid gray',
    backgroundColor: 'darkgray',
  },
  media: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    zIndex: 1,
    position: 'relative',
  },
  header: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

type PokemonCardProps = {

};

const PokemonCard = (props: PokemonCardProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.pokemonCard}>
      <Box className={classes.media}>
        <Image
          alt="machoke"
          src="https://poketch-cdn-assets.s3.amazonaws.com/images/pokemon/static/shiny/machoke.png"
          width={100}
          height={100}
        />
      </Box>

      <Box className={classes.cardContent}>
        <Box className={classes.header}>
          <Text>Machoke</Text>
          <HeartBroken />
        </Box>
      </Box>
    </Box>
  );
};

export default PokemonCard;
