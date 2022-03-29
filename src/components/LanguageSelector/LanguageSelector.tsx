import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Select } from '@mantine/core';

import { Language } from '@/redux/reducers/session/session.types';

import { useTr } from '@/tools/TranslationPlaceholder';

const LanguageSelector = () => {
  const tr = useTr();
  const { push, pathname, asPath, query, locale } = useRouter();

  const handleLanguageChange = useCallback(async (newValue: Language) => {
    await push({ pathname, query }, asPath, { locale: newValue });
  }, [asPath, pathname, push, query]);

  const selectedLanguage = useMemo(() => locale as Language, [locale]);

  const languages = useMemo(() => ([
    { value: Language.EN, label: tr('EN') },
    { value: Language.PT, label: tr('PT') },
  ]), [tr]);

  return (
    <Select
      size="sm"
      radius="lg"
      data={languages}
      nothingFound={tr('No language found')}
      onChange={handleLanguageChange}
      value={selectedLanguage}
    // label={tr('Dex')}
    />
  );
};

export default LanguageSelector;
