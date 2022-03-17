import React, { useCallback, useContext } from 'react';

const TranslatorContext = React.createContext((text: string) => text);

const TranslatorProvider: React.FC = ({ children }) => {
  // const languageId = getLanguageIdFromSomewhere();

  const tr = useCallback((text: string) => text, []);

  return (
    <TranslatorContext.Provider value={tr}>
      {children}
    </TranslatorContext.Provider>
  );
};

const useTr = () => {
  const context = useContext(TranslatorContext);

  if (!context) {
    throw new Error('useTr must be used within a TranslatorProvider');
  }

  return context;
};

export { TranslatorProvider, useTr };
