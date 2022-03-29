import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type GetServerSidePropsContext } from 'next';

const getServerSideTranslations = async (ctx: GetServerSidePropsContext, namespaces: string[]) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || 'en', namespaces)),
  },
});

export default getServerSideTranslations;
