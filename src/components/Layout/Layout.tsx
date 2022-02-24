import React from 'react';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';

const Layout: NextPage = ({ children }) => {
  const router = useRouter();
  console.log('router: ', router);

  return (
    <div>
      {children}

      <div>footer</div>
    </div>
  );
};

export default Layout;
