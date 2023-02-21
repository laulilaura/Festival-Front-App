import * as React from 'react';
import Header from './Header';

import { FixedSizeList } from 'react-window';
import {Link} from 'react-router-dom';

import { Box, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Button from '@mui/material-next/Button';
import Grid from '@mui/system/Unstable_Grid';


function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Bénévoles ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
}

export default function Benevoles(){
    return (
    <div className="Benevoles">
        <Header/>
        <Grid container spacing={2} sx={{height:'100%', width:'100%',  display: 'flex', m:0, p:0}}>
            <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h2">Benevoles</Typography>
            </Grid>
            <Grid xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button sx={{backgroundColor:'#FBCE9E'}} variant="filledTonal" component={Link} to="/maintenance">Par crénau</Button>
            </Grid>
            <Grid xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button sx={{backgroundColor:'#FBCE9E'}} variant="filledTonal" component={Link} to="/maintenance">Par zone</Button>
            </Grid>
            <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p:5}}>
                <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
                    <FixedSizeList
                        height={400}
                        width={600}
                        itemSize={46}
                        itemCount={200}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </Box>
            </Grid>
        </Grid>
    </div>
    );
};
