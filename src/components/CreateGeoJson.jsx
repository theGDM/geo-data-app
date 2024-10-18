import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import Modal from 'react-modal';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { createGeoJson } from '../services/api';
import { fetchGeoJsons } from '../actions/GeoJsonAction';
import zIndex from '@mui/material/styles/zIndex';

export default function CreateGeoJson({ isOpen, onClose, geoData }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [endDate, setEndDate] = useState("");
    const [value, setValue] = useState('');
    const [isGeoJsonCreated, setGeoJsonCreated] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '95%' : '30%',
            height: '80%',
            backgroundColor: colors.blackAccent[500],
            borderRadius: '0.5rem',
            boxShadow: '0.2rem 0.2rem 0.2rem rgba(2, 2, 2, 0.8)',
            overflow: 'auto',
            padding: '1rem',
            background: "#000000",
            border: '0',
            zIndex: '100'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Set your desired barrier color here
        },
    };

    const createTaskHandler = async () => {
        if (title == '') {
            toast('Title of the task can not be empty!');
            return;
        }

        if (desc == '') {
            toast('Description of the task can not be empty!');
            return;
        }

        let userId = localStorage.getItem('userId');
        setGeoJsonCreated(true);
        await createGeoJson(userId, title, desc, geoData);
        dispatch(fetchGeoJsons(userId));
        setGeoJsonCreated(false);
        onClose();
    }

    const StyledButton = styled(IconButton)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
    }));

    const StyledDay = styled(PickersDay)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        color:
            theme.palette.mode === 'light'
                ? theme.palette.secondary.dark
                : theme.palette.secondary.light,
    }));

    return (
        <Modal
            isOpen={isOpen}
            sx={{ position: 'relative' }}
            onRequestClose={onClose}
            contentLabel='Job Details Information'
            style={modalStyle}
        >
            <Box
                width='100%'
                p='0.5rem 1rem'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Typography
                    color='#000'
                    fontSize='1.8rem'
                    lineHeight='1.6'
                    color={colors.greenAccent[500]}
                >
                    Create Geo Json
                </Typography>
            </Box>
            <Box height='0.1rem' bgcolor={colors.greenAccent[500]}></Box>
            <Box
                sx={{ mt: '0.1rem' }}
                width='35rem'
                p='0rem 2rem'
                display='flex'
                flexDirection='column'
                alignItems='center'
                width='100%'
            >
                <Box height='1.5rem'></Box>
                <TextField
                    id="filled-required"
                    fullWidth
                    defaultValue=""
                    type="text"
                    variant="filled"
                    sx={{
                        backgroundColor: colors.blackAccent[500],
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
                            Title
                        </Typography>
                    }
                    FormHelperTextProps={{
                        style: {
                            color: colors.greenAccent[500],
                            fontSize: '1.3rem'
                        },
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <Box height='1.5rem'></Box>
                <TextField
                    id="filled-required"
                    fullWidth
                    defaultValue=""
                    type="text"
                    variant="filled"
                    sx={{
                        backgroundColor: colors.blackAccent[500],
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
                            Description
                        </Typography>
                    }
                    FormHelperTextProps={{
                        style: {
                            color: colors.greenAccent[500],
                            fontSize: '1.3rem'
                        },
                    }}
                    onChange={(e) => setDesc(e.target.value)}
                    autoFocus
                />
                <Box height='1.5rem'></Box>
            </Box>
            {isGeoJsonCreated == false ? <Box display='flex' flexDirection='row' position='absolute'
                right='1rem'
                bottom='0'>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '1rem',
                        mb: '1rem',
                        mr: '1rem',
                        backgroundColor: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0',
                    }}
                    onClick={createTaskHandler}
                >
                    Create
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '1rem',
                        mb: '1rem',
                        backgroundColor: colors.redAccent[500],
                        "&:hover": {
                            backgroundColor: colors.redAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0',
                    }}
                    onClick={onClose}
                >
                    Close
                </Button>
            </Box>
                : <Box display='flex' justifyContent='center' alignItems='center' position='absolute'
                    right='1rem'
                    bottom='0'>
                    <ThreeDots
                        height="4rem"
                        width="4rem"
                        radius="5"
                        color={colors.greenAccent[600]}
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </Box>
            }
        </Modal >
    );
}