import useFetch from "../hook/useFetch";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Undo from "@mui/icons-material/Undo";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import TimelineIcon from '@mui/icons-material/Timeline';
import { ProjectNameType } from "./contract/ContractCreate";


const TimelinePage = () => {
    const { data } = useFetch<ProjectNameType[]>("api/project-name");
    const navigate = useNavigate();
    if (data) {
      return (
        <Container>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb:1,
            }}
            
          >
            <TimelineIcon sx={{color:'lightcoral'}}/>
            <Box>
              <Typography variant="h5" component="h2">
                项目时间轴
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 1 }}>
              <IconButton color="secondary" onClick={() => navigate("/")}>
                <Undo />
              </IconButton>
            </Box>
          </Box>
  
          {data ? <Grid container spacing={2} >
            {data?.map((item) => (
              <Grid item key={item.projectName} xs={6} sm={4} lg={3}>
                <Paper elevation={3}>
                  <Button onClick={() => navigate(`/timeline/${item.id}`)} sx={{fontWeight: 'bold'}}>
                    <Box sx={{ textDecoration: "none" }}>{item.projectName}</Box>
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid> : null}
        </Container>
      );
    }
    return (
      <>
        <Loading message='loading' />
      </>
    );
}

export default TimelinePage