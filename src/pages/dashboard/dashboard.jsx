import { Box, Typography, useMediaQuery, Grid, Paper, Divider, Link, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/Header";
import { fetchGeoJsons } from "../../actions/GeoJsonAction";
import { deleteGeoJson } from "../../services/api";
import { useNavigate } from "react-router-dom";
import newGeoJson from '../../assets/globe.png';
import backgroundImageUrl from '../../assets/bg-4.png';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    let geoJsonsData = useSelector((state) => state.geoJson);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        dispatch(fetchGeoJsons(userId));
    }, []);

    const handleDelete = async (resumeId) => {
        await deleteGeoJson(resumeId);
        let userId = localStorage.getItem('userId');
        dispatch(fetchGeoJsons(userId));
    }

    const handleView = (geoJson) => {
        navigate('/geomap', { state: { geoJson } });
    }

    const handleCreateNewGeoJson = () => {
        navigate('/create-new-geo-json');
    }

    return (
        <Box width='100vw' height='100vh' position='relative' sx={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", imageOrientation: 'landscape' }}>
            <Header />
            <Box display='flex' flexDirection='row' alignItems='center' m='2rem 1.6rem' flexWrap='wrap'>
                <Box width='25rem' height='15rem' bgcolor={colors.blackAccent[500]} borderRadius='0.5rem' sx={{ cursor: 'pointer' }} p='1rem' m='1rem' boxShadow='0.2rem 0.2rem 0.8rem #000' display='flex' flexDirection='column' alignItems='center' justifyContent='center' onClick={handleCreateNewGeoJson}>
                    <img src={newGeoJson} style={{ height: '60%' }} />
                    <Typography fontSize='1.5rem' color={colors.greenAccent[400]} mt='0.5rem'>Import/Create Geo Json</Typography>
                </Box>
                {geoJsonsData.geojsons.map((geojson) => (
                    <Box width='25rem' height='15rem' bgcolor={colors.blackAccent[500]} borderRadius='0.5rem' p='1rem' m='1rem' boxShadow='0.2rem 0.2rem 0.8rem #000' display='flex' flexDirection='column' alignItems='start' position='relative' >
                        <Typography fontSize='1.5rem' color={colors.greenAccent[400]} mt='0.5rem'>{geojson.title}</Typography>
                        <Typography fontSize='1.3rem' color={colors.blueAccent[400]} mt='0.5rem'>{geojson.description}</Typography>
                        <Box
                            position='absolute'
                            bottom='1rem'
                            right='1rem'
                            display='flex'
                            gap='0.5rem'
                            zIndex='10'
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    mt: '1.5rem',
                                    mb: '1rem',
                                    backgroundColor: colors.greenAccent[600],
                                    "&:hover": {
                                        backgroundColor: colors.greenAccent[700], // Set your desired hover color
                                    },
                                    fontSize: '1.2rem',
                                    borderRadius: '0.2rem'
                                }}
                                onClick={() => handleView(geojson)}
                            >
                                VIEW
                            </Button>
                            <Button
                                variant='contained'
                                sx={{
                                    mt: '1.5rem',
                                    mb: '1rem',
                                    backgroundColor: colors.redAccent[500],
                                    "&:hover": {
                                        backgroundColor: colors.redAccent[600], // Set your desired hover color
                                    },
                                    fontSize: '1.2rem',
                                    borderRadius: '0.2rem'
                                }}
                                onClick={() => handleDelete(geojson._id)}
                            >
                                DELETE
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box >
    );
};

export default Dashboard;