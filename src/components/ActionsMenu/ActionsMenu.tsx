import React, {
  type ReactElement,
  type ReactNode,
} from 'react';

import {
  ActionIcon,
  Menu,
} from '@mantine/core';

type ActionsMenuProps = {
  buttonContent: ReactElement;
  children: ReactNode;
};

const ActionsMenu = (props: ActionsMenuProps) => {
  const {
    buttonContent,
    children,
  } = props;

  return (
    <Menu
      control={(
        <ActionIcon>
          {buttonContent}
        </ActionIcon>
      )}
    >
      {children}
    </Menu>
  );
};

export default ActionsMenu;
