import React, { useCallback, ChangeEvent, Ref } from 'react';

import InputBase, { InputBaseProps } from '@mui/material/InputBase';

import inputStyles from './Input.styles';

type ChangeEvt = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type InputProps<TValue extends string> = {
  id?: string;
  value: TValue;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (evt: ChangeEvt, value: TValue) => void;
  onBlur?: (evt: ChangeEvt, value: TValue) => void;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  inputBaseProps?: InputBaseProps;
  forwardedRef?: Ref<HTMLInputElement>;
};

const Input = <TValue extends string>(props: InputProps<TValue>) => {
  const {
    id,
    value,
    placeholder,
    disabled,
    required,
    onChange,
    onBlur,
    multiline,
    minRows,
    maxRows,
    inputBaseProps,
    forwardedRef,
  } = props;

  const { classes } = inputStyles();

  const handleOnChange = useCallback((evt: ChangeEvt) => {
    if (onChange) {
      onChange(evt, evt.target.value as TValue);
    }
  }, [onChange]);

  const handleOnBlur = useCallback((evt: ChangeEvt) => {
    if (onBlur) {
      onBlur(evt, evt.target.value as TValue);
    }
  }, [onBlur]);

  return (
    <InputBase
      ref={forwardedRef}
      size="small"
      margin="dense"
      {...inputBaseProps}
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      classes={{ input: classes.input }}
    />
  );
};

export default React.forwardRef<HTMLInputElement, InputProps<any>>((props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
