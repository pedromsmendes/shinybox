import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Collection from '@/containers/Pokemons';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Collection;