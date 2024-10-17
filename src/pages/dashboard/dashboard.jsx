import { Box, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        // dispatch(fetchTasksData(userId));
    }, []);


    return (
        <Box width='100vw' height='100vh' >
            <Header />
        </Box >
    );
};

export default Dashboard;