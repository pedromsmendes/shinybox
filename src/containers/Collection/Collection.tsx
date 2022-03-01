import React, { useCallback, useState } from 'react';

import Grid from '@mui/material/Grid';

import Input from '@/components/Input';
import Layout from '@/components/Layout';
import PokemonCard from '@/components/PokemonCard';

import listStyles from './Collection.styles';

const Collection = () => {
  const [text, setText] = useState('');

  const { classes } = listStyles();

  const handleTextChange = useCallback((_evt, value: string) => {
    setText(value);
  }, []);

  return (
    <Layout>
      <Input
        value={text}
        onChange={handleTextChange}
        placeholder="Search..."
      />

      <Grid container spacing={2} className={classes.grid}>
        {Array(12).fill(0).map((_, i) => (
          <Grid key={i} item>
            <PokemonCard />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Collection;
