import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MUITabs from '@mui/material/Tabs';
import MUITab from '@mui/material/Tab';

import GifBoxIcon from '@mui/icons-material/GifBox';
import ACIcon from '@mui/icons-material/AcUnit';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';

import { Route, Tab } from '@/utils/globals';

const Header = () => {
  const router = useRouter();

  const currentTab = useMemo(() => {
    switch (router.route) {
      case Route.Counters:
        return Tab.Counters;

      case Route.Dex:
        return Tab.Dex;

      case Route.Collection:
      default:
        return Tab.Collection;
    }
  }, [router.route]);

  const handleTabChange = useCallback((_evt, value) => {
    switch (value) {
      case Tab.Counters:
        router.push(Route.Counters);
        break;

      case Tab.Dex:
        router.push(Route.Dex);
        break;

      case Tab.Collection:
      default:
        router.push(Route.Collection);
        break;
    }
  }, [router]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>LOGO</Box>

        <MUITabs value={currentTab} onChange={handleTabChange}>
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
        </MUITabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
