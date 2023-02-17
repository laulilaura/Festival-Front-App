import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logoMaintenance from '../picture/icons/bientot-disponible.png';
import Header from './Header'


function MaintenancePage() {

  return (
      <Box>
        <Header/>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:'100%', width:'100%'}}>
          <img style={{ width: '40%'}} src={logoMaintenance} alt="icon de maintenance"/>
          <Typography variant="overline" display="block">Page en construction, revient plus tard !</Typography >
        </Box>
      </Box>
  );
}
export default MaintenancePage;
