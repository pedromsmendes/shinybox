import React, { type ReactNode, useMemo } from 'react';

import {
  Alert as MantineAlert,
  Collapse,
} from '@mantine/core';

import {
  CircleCheck as SucessIcon,
  AlertTriangle as WarningIcon,
  AlertCircle as ErrorIcon,
} from 'tabler-icons-react';

type AlertProps = {
  title: string;
  show: boolean;
  variant?: 'sucess' | 'error' | 'warning';
  children: ReactNode;
};

const Alert = (props: AlertProps) => {
  const {
    title,
    show,
    variant = 'error',
    children,
  } = props;


  const { color, icon } = useMemo(() => {
    switch (variant) {
      case 'sucess':
        return {
          color: 'green',
          icon: <SucessIcon />,
        };

      case 'warning':
        return {
          color: 'yellow',
          icon: <WarningIcon />,
        };

      case 'error':
      default:
        return {
          color: 'red',
          icon: <ErrorIcon />,
        };
    }
  }, [variant]);

  return (
    <Collapse in={show}>
      <MantineAlert
        color={color}
        icon={icon}
        title={title}
      >
        {children}
      </MantineAlert>
    </Collapse>
  );
};

export default Alert;
