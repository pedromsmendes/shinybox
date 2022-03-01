import React, { useCallback, useState } from 'react';

import Layout from '@/components/Layout';
import Input from '@/components/Input';
import PokemonCard from '@/components/PokemonCard';

const Collection = () => {
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

      <PokemonCard />
    </Layout>
  );
};

export default Collection;
