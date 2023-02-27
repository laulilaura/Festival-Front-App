import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logoMaintenance from '../picture/icons/bientot-disponible.png';
import Header from './Header'


function MaintenancePage() {

  return (
      <div>
        <Header/>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:'100%', width:'100%', my: 5}}>
          <img style={{ width: 200}} src={logoMaintenance} alt="icon de maintenance"/>
          <Typography variant="overline" display="block">Page en construction, revient plus tard !</Typography >
        </Box>
      </div>
  );
}
export default MaintenancePage;
