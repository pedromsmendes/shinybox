import React from 'react';

import { Text } from '@mantine/core';

import { useTr } from '@/tools/translator';

const Counters = () => {
  const tr = useTr();
  return (
    <div>
      <Text>{tr('COUNTERS')}</Text>
    </div>
  );
};

export default Counters;
