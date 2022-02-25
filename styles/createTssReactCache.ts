import createCache from '@emotion/cache';

const createTssReactCache = () => {
  return createCache({ key: 'tss' });
};

export default createTssReactCache;
