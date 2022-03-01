import { makeStyles } from '@/styles/makeStyles';

export const INPUT_HEIGHT = 40;

const inputStyles = makeStyles()((theme) => ({
  input: {
    minHeight: INPUT_HEIGHT,
    borderRadius: INPUT_HEIGHT / 2,
    padding: theme.spacing(0, 1.5),
    backgroundColor: theme.palette.common.inputBackground,
    color: 'black',
    borderStyle: 'solid',
    borderColor: theme.palette.common.inputBorder,
    borderWidth: 1,
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default inputStyles;
