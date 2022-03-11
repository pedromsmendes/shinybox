import React, { MouseEvent, ReactNode, useCallback } from 'react';

import clsx from 'clsx';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';

import { makeStyles } from '@/styles/makeStyles';

export const BUTTON_HEIGHT = 40;

const useStyles = makeStyles()((theme) => ({
  buttonBase: {
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    padding: theme.spacing(0, 1.5),
    backgroundColor: theme.palette.common.inputBackground,
    color: 'black',
    borderStyle: 'solid',
    borderColor: theme.palette.common.inputBorder,
    borderWidth: 1,
    fontSize: 16,
  },
}));

type ButtonProps = {
  onClick?: (evt: MouseEvent) => void;
  disabled?: boolean;
  children: ReactNode;
  buttonBaseProps?: ButtonBaseProps;
};

const Button = (props: ButtonProps) => {
  const {
    onClick,
    disabled,
    children,
    buttonBaseProps,
  } = props;

  const { classes } = useStyles();

  const handleOnClick = useCallback((evt: MouseEvent) => {
    if (onClick) {
      onClick(evt);
    }
  }, [onClick]);

  return (
    <ButtonBase
      {...buttonBaseProps}
      onClick={handleOnClick}
      disabled={disabled}
      className={clsx(classes.buttonBase)}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
