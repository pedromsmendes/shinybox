import React from 'react';

import { Text } from '@mantine/core';

import { useTranslation } from 'react-i18next';

const Counters = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Text>{t('general.counters')}</Text>
    </div>
  );
};

export default Counters;
