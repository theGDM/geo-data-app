import React, { useEffect, useState } from "react";
import { Button, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import logo from '../assets/SkyServeLogo.png';
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem('userEmail'));
    let userData = useSelector((state) => state.userData);

    const handleNavigation = (text) => {
        if (text == 'login') {
            navigate('/');
        } else if (text == 'register') {
            navigate('/register');
        } else {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userId");
            navigate('/');
        }
    }

    return (
        <Box width='100vw' height='8vh' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' bgcolor={colors.blackAccent[600]} p='0 10px' sx={{ boxShadow: "0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.9)" }}>
            <img src={logo} style={{ height: '80%' }} />
            {!user ? <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '0.3rem',
                        mb: '0.2rem',
                        backgroundColor: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0'
                    }}
                    onClick={() => handleNavigation('login')}
                >
                    Login
                </Button>
                <Box width='1.5rem'></Box>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            mt: '0.3rem',
                            mb: '0.2rem',
                            backgroundColor: colors.greenAccent[500],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[600], // Set your desired hover color
                            },
                            fontSize: '1.2rem',
                            borderRadius: '0'
                        }}
                        onClick={() => handleNavigation('register')}
                    >
                        Signup
                    </Button>
                </Box>
            </Box> : <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '0.3rem',
                        mb: '0.2rem',
                        backgroundColor: colors.redAccent[500],
                        "&:hover": {
                            backgroundColor: colors.redAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0'
                    }}
                    onClick={() => handleNavigation('logout')}
                >
                    Logout
                </Button>
            </Box>}
        </Box >
    );
}