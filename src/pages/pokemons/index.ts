import { type GetServerSideProps } from 'next';

import Pokemons from '@/containers/Pokemons';
import getServerSideTranslations from '@/tools/getServerSideTranslations';

export const getServerSideProps: GetServerSideProps = (ctx) => (
  getServerSideTranslations(ctx, ['common'])
);

export default Pokemons;