import React from 'react';

import { Text } from '@mantine/core';

import { useTr } from '@/tools/translator';

const Collection = () => {
  const tr = useTr();

  return (
    <div>
      <Text>{tr('COLLECTION')}</Text>
    </div>
  );
};

export default Collection;
