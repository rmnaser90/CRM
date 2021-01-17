import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Clients from './Clients';
import Actions from './Actions';
import Analytics from './Analytics';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Tabs value={value} className="appBar" onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Clients" data-name="" {...a11yProps(0)} />
          <Tab label="Actions" data-name="actions" {...a11yProps(1)} />
          <Tab label="Analytics" data-name="analytics"{...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="mainContainer">
        <Clients/>
      </TabPanel>
      <TabPanel value={value} index={1} className="mainContainer">
        <Actions/>
      </TabPanel>
      <TabPanel value={value} index={2} className="mainContainer">
        <Analytics/>
      </TabPanel>
    </div>
  );
}
