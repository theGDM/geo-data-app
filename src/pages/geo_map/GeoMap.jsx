import React, { useEffect, useRef } from 'react';
import { Container, Box, Typography, Avatar, Grid, Paper, Divider, Link, Button } from '@mui/material';
import Header from '../../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import { updateGeoJson } from '../../services/api';

const GeoMap = () => {
    const location = useLocation();
    const [geoJsonData, setGeoJsonData] = useState(location.state.geoJson.geoData);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const indiaCoordinates = [20.5937, 78.9629]; // Latitude and Longitude of India
    const zoomLevel = 5;
    const featureGroupRef = useRef(null);  // Create a reference for the feature group


    const handleBackNavigaton = () => {
        navigate('/dashboard');
    }

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        console.log(geoJsonData);
        if (!user) navigate("/");
    }, []);

    useEffect(() => {
        if (featureGroupRef.current) {
            geoJsonData.features.forEach((feature) => {
                const layer = L.geoJSON(feature);
                featureGroupRef.current.addLayer(layer); // Add initial features to the feature group
            });
        }
    }, [geoJsonData]);

    const onEdited = (e) => {
        if (featureGroupRef.current) {
            // Iterate through layers that were edited
            e.layers.eachLayer((layer) => {
                const updatedGeoJson = layer.toGeoJSON();
                setGeoJsonData((prevGeoJson) => {
                    // Find the index of the updated feature in the existing GeoJSON
                    const index = prevGeoJson.features.findIndex((feature) => feature.id === updatedGeoJson.id);
                    // If the feature exists, update it
                    if (index !== -1) {
                        const updatedFeatures = [...prevGeoJson.features];
                        updatedFeatures[index] = updatedGeoJson; // Update the feature in the array
                        return { ...prevGeoJson, features: updatedFeatures };
                    }
                    return prevGeoJson; // Return the original if not found
                });
            });
        }
    };

    const onDeleted = (e) => {
        if (featureGroupRef.current) {
            e.layers.eachLayer((layer) => {

                setGeoJsonData((prevGeoJson) => ({
                    ...prevGeoJson,
                    features: prevGeoJson.features.filter(feature => feature.id !== layer.toGeoJSON().id),
                }));
            });
        }
    };

    const onCreated = (e) => {
        const layer = e.layer;
        if (featureGroupRef.current) {
            featureGroupRef.current.addLayer(layer); // Add the created layer to the feature group

            setGeoJsonData((prevGeoJson) => ({
                ...prevGeoJson,
                features: [...prevGeoJson.features, layer.toGeoJSON()],
            }));
        }
    };

    const downloadGeoJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJsonData));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "updated_geojson.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleSaveGeoJson = async () => {
        console.log(geoJsonData);
        let body = {
            geoData: geoJsonData
        }

        await updateGeoJson(location.state.geoJson._id, body);
    }

    return (
        <Box width='100vw' height='100vh' display='flex' flexDirection='column' alignItems='center'>
            <Header />
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' my='3rem' >
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '0.3rem',
                        mb: '0.2rem',
                        backgroundColor: colors.greenAccent[600],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[700], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0.2rem'
                    }}
                    onClick={handleBackNavigaton}
                >
                    BACK
                </Button>
                <Box width='1.5rem'></Box>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            mt: '0.3rem',
                            mb: '0.2rem',
                            backgroundColor: colors.greenAccent[600],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[700], // Set your desired hover color
                            },
                            fontSize: '1.2rem',
                            borderRadius: '0.2rem'
                        }}
                        onClick={downloadGeoJson}
                    >
                        DOWNLOAD GEO JSON
                    </Button>
                </Box>
            </Box>
            <Box width='210mm' maxHeight='297mm' backgroundColor='#EDEAFF' mb='1rem' color='#000' mx='auto'>
                <MapContainer center={indiaCoordinates} zoom={zoomLevel} style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON key='my-geojson' data={geoJsonData} />
                    <FeatureGroup ref={featureGroupRef}>
                        <EditControl
                            position='topright'
                            onCreated={onCreated}
                            onEdited={onEdited}
                            onDeleted={onDeleted}
                            draw={{
                                polyline: true,
                                polygon: true,
                                circle: true,
                                marker: true,
                                rectangle: true,
                            }}
                            edit={{
                                featureGroup: featureGroupRef.current  // Pass the feature group here
                            }}
                        />
                    </FeatureGroup>
                </MapContainer>
            </Box >
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            mt: '0.3rem',
                            mb: '0.2rem',
                            backgroundColor: colors.greenAccent[600],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[700], // Set your desired hover color
                            },
                            fontSize: '1.2rem',
                            borderRadius: '0.2rem'
                        }}
                        onClick={handleSaveGeoJson}
                    >
                        SAVE
                    </Button>
                </Box>
            </Box>
        </Box >
    );

};

export default GeoMap;