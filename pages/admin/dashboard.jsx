import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { textAlign } from '@mui/system';
import UserTable from '@/components/admin/userTable';


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Dashboard = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Box>
        <Typography color="#1976d2" sx={{textAlign: 'center', padding: '1.5rem 0' }} variant="h4" component="div">
          Admin
        </Typography>
        <Tabs

          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', width: 200 }}
        >
          <Tab label={<div><DashboardIcon style={{verticalAlign: 'middle'}} /> Dashboard</div>} {...a11yProps(0)}  />
          <Tab label={<div><GroupIcon style={{verticalAlign: 'middle'}} /> Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>} {...a11yProps(1)}  />
          <Tab label={<div><LibraryBooksIcon style={{verticalAlign: 'middle'}} /> Posts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>} {...a11yProps(2)}  />
        </Tabs>
      </Box>
      <TabPanel  value={value} index={0}>
        Dashboard
      </TabPanel>
      <TabPanel style={{width: '100%'}} value={value} index={1}>
        <UserTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Posts
      </TabPanel>
    </Box>
  )
}

export default Dashboard;