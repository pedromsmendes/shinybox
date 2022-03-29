import React from 'react';

import { Text } from '@mantine/core';

import { useTranslation } from 'react-i18next';

const Collection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Text>{t('general.collection')}</Text>
    </div>
  );
};

export default Collection;
