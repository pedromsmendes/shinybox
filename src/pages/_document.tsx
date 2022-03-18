import type { DocumentContext } from 'next/document';
import NextDocument from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';

const stylesServer = createStylesServer();

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await NextDocument.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </>
      ),
    };
  }
}