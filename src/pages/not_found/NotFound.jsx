import React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import notFound from '../../assets/error404.png';

export default function NotFound() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width='100vw' height='100vh' display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
            <img
                src={notFound}
                alt='Error'
                loading="lazy"
                style={{ height: '80%' }}
            />
        </Box>
    );
}