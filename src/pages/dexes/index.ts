import { type GetServerSideProps } from 'next';

import Dexes from '@/containers/Dexes';
import getServerSideTranslations from '@/tools/getServerSideTranslations';

export const getServerSideProps: GetServerSideProps = (ctx) => (
  getServerSideTranslations(ctx, ['common'])
);

export default Dexes;
