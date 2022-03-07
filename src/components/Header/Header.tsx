import React, { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MUITabs from '@mui/material/Tabs';
import MUITab from '@mui/material/Tab';


import GifBoxIcon from '@mui/icons-material/GifBox';
import ACIcon from '@mui/icons-material/AcUnit';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';

import { Route } from '@/globals';
import { makeStyles } from '@/styles/makeStyles';

import Drawer from './Drawer';
import clsx from 'clsx';

export enum Tab {
  Collection = 'collection',
  Dex = 'dex',
  Counters = 'counters',
  Pokemons = 'pokemons',
}

const useStyles = makeStyles()((theme) => ({
  toolbar: {
    padding: theme.spacing(0, 1),
    height: theme.mixins.toolbarHeight,
    minHeight: theme.mixins.toolbarHeight,
    marginLeft: theme.mixins.drawerWidth,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeIn,
    }),
  },
  toolbarDrawerOpen: {
    marginLeft: theme.mixins.drawerWidthOpen,
  },
  tabs: {
    height: theme.mixins.toolbarHeight,
  },
  tabButtons: {
    '&>button': {
      height: theme.mixins.toolbarHeight,
    },
  },
}));

const Header = () => {
  const [drawerState, setDrawerState] = useState(false);

  const router = useRouter();

  const { classes } = useStyles();

  const currentTab = useMemo(() => {
    switch (router.route) {
      case Route.Counters:
        return Tab.Counters;

      case Route.Dex:
        return Tab.Dex;

      case Route.Pokemons:
        return Tab.Pokemons;

      case Route.Collection:
      default:
        return Tab.Collection;
    }
  }, [router.route]);

  const toggleDrawer = useCallback(() => {
    setDrawerState((prevState) => !prevState);
  }, []);

  const handleTabChange = useCallback((_evt, value) => {
    switch (value) {
      case Tab.Counters:
        router.push(Route.Counters);
        break;

      case Tab.Dex:
        router.push(Route.Dex);
        break;

      case Tab.Pokemons:
        router.push(Route.Pokemons);
        break;

      case Tab.Collection:
      default:
        router.push(Route.Collection);
        break;
    }
  }, [router]);

  return (
    <>
      <AppBar position="static">
        <Toolbar className={clsx(classes.toolbar, drawerState && classes.toolbarDrawerOpen)}>
          <Box>LOGO</Box>

          <MUITabs
            value={currentTab}
            onChange={handleTabChange}
            className={classes.tabs}
            classes={{
              root: classes.tabs,
              flexContainer: classes.tabButtons,
            }}
          >
            <MUITab
              value={Tab.Collection}
              icon={<GifBoxIcon />}
              iconPosition="start"
              label="Collection"
            />
            <MUITab
              value={Tab.Dex}
              icon={<ACIcon />}
              iconPosition="start"
              label="Dex"
            />
            <MUITab
              value={Tab.Counters}
              icon={<AddAlarmIcon />}
              iconPosition="start"
              label="Counters"
            />
            <MUITab
              value={Tab.Pokemons}
              icon={<AddAlarmIcon />}
              iconPosition="start"
              label="Pokémons"
            />
          </MUITabs>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerState} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Header;
