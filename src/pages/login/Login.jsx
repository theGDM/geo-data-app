import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import backgroundImageUrl from '../../assets/bg-2.jpg';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import Header from "../../components/Header";
import { getUser, signIn } from "../../services/api";
import { SetUser } from "../../actions/UserAction";
import { auth, provider } from "../../config";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        if (!user) navigate("/");
        else navigate("/dashboard");
    }, []);

    const handleNavigation = () => {
        navigate('/register');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email == '') {
            toast('Please enter the email address!');
            return;
        }

        if (password == '') {
            toast('Password can not be empty!');
            return;
        }

        setLoggedIn(true);
        let response = await signIn(email, password);
        setLoggedIn(false);

        if (response.message != null) {
            toast(response.message);
        } else {
            localStorage.setItem("userEmail", response.email);
            localStorage.setItem('userId', response._id);
            dispatch(SetUser(response));
            navigate('/dashboard');
        }
    };

    const handleGoogleSignIn = async () => {
        signInWithPopup(auth, provider).then(async (data) => {
            setLoggedIn(true);
            let response = await signIn(data.user.email, data.user.uid);
            setLoggedIn(false);
            if (response.message != null) {
                toast(response.message);
            } else {
                localStorage.setItem("userEmail", response.email);
                localStorage.setItem('userId', response._id);
                dispatch(SetUser(response));
                navigate('/dashboard');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Box width='100vw' height='100vh' position='relative' sx={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", imageOrientation: 'landscape', }}>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    opacity: '0.95',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: colors.blackAccent[700],
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.9)",
                }}
            >
                <Avatar sx={{ m: '0.5rem', bgcolor: colors.greenAccent[500] }}>
                    <LockOutlinedIcon color={colors.greenAccent[500]} />
                </Avatar>
                <Typography component="h1" fontSize='1.6rem' fontWeight='600' color={colors.greenAccent[500]}>
                    LOG IN
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: '0.1rem' }}
                    width='35rem'
                    p='0rem 2rem'
                >
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="text"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },
                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                Email
                            </Typography>
                        }
                        FormHelperTextProps={{
                            style: {
                                color: colors.greenAccent[500],
                                fontSize: '1.3rem'
                            },
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <Box height='1.5rem'></Box>
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="password"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },

                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                Password
                            </Typography>
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />

                    {isLoggedIn == false ? <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: '1.5rem',
                            mb: '1rem',
                            backgroundColor: colors.greenAccent[500],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[600], // Set your desired hover color
                            },
                            fontSize: '1.2rem',
                            borderRadius: '0'
                        }}
                        onClick={handleSubmit}

                    >
                        Log In
                    </Button> : <Box display='flex' justifyContent='center' alignItems='center'>
                        <ThreeDots
                            height="8rem"
                            width="8rem"
                            radius="9"
                            color={colors.greenAccent[600]}
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </Box>}
                    <Box display='flex' flexDirection='row'>
                        <Typography color={colors.greenAccent[200]} fontSize='1.2rem'>
                            Don't have an account?&nbsp;
                        </Typography>
                        <Typography fontWeight="600" color={colors.greenAccent[500]} fontSize='1.2rem' sx={{ cursor: 'pointer' }} onClick={handleNavigation}>
                            Sign Up
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' mt='1rem'>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{
                                mt: '0.3rem',
                                mb: '0.2rem',
                                backgroundColor: colors.redAccent[500],
                                "&:hover": {
                                    backgroundColor: colors.blackAccent[500], // Set your desired hover color
                                },
                                fontSize: '1.2rem',
                                borderRadius: '0'
                            }}

                            onClick={handleGoogleSignIn}
                        >
                            Login with Google
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}