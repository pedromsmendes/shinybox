import React, { useCallback, useState } from 'react';

import Layout from '@/components/Layout';
import Input from '@/components/Input';

const Pokemons = () => {
  const [text, setText] = useState('');

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

      POKEMONS
    </Layout>
  );
};

export default Pokemons;
