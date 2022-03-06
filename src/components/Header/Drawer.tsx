import React from 'react';

import Link from 'next/link';

import clsx from 'clsx';
import MUIDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { makeStyles } from '@/styles/makeStyles';

type DrawerProps = {
  open: boolean;
  toggleDrawer: () => void;
};

const useStyles = makeStyles()((theme) => ({
  drawer: {
    width: theme.mixins.drawerWidth,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeIn,
    }),
  },
  drawerOpen: {
    width: theme.mixins.drawerWidthOpen,
  },
  drawerButton: {
    height: theme.mixins.toolbarHeight,
    width: theme.mixins.drawerWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&>div': {
      height: 'fit-content',
    },
  },
  list: {
    width: theme.mixins.drawerWidthOpen,
    overflowX: 'hidden',
    '&>div': { // list buttons
      padding: theme.spacing(1, 0),
      '&>:first-child': { // icons
        width: theme.mixins.drawerWidth,
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
}));

const Drawer = ({ open, toggleDrawer }: DrawerProps) => {
  const { classes } = useStyles();

  return (
    <MUIDrawer
      variant="permanent"
      open={open}
      classes={{
        paper: clsx(
          classes.drawer,
          open && classes.drawerOpen,
        ),
      }}
    >
      <div className={classes.drawerButton}>
        <div>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      <Divider />

      <List className={classes.list}>
        <Link href="/collection/create" passHref>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>
              New dex entry
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link href="/counters/create" passHref>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>
              New counter
            </ListItemText>
          </ListItemButton>
        </Link>

        <Divider />
        {/* ADMIN ACTIONS */}
        <Link href="/pokemons/create" passHref>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>
              New pokémon
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link href="/dex/create" passHref>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>
              New dex
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
