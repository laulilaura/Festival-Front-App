import * as React from 'react';
import { Typography, Box } from '@mui/material';

export default function Footer(props){
    return(
        <div>
            <Box  backgroundColor={props.colorBackground} color={props.color} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography>© 2023, “FestiFun, tous droits réservés”</Typography>
            </Box>
        </div>
    );
}