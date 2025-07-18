
import './App.css'
import { Box, Container, Grid, Typography } from "@mui/material";
import { DynamicForm } from './components/DynamicForm'
import SubmissionsStack from './components/SubmissionsStack';




export default function App() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Form Generator App
      </Typography>

      <Grid container spacing={4} >
        <Grid item xs={12} md={7}>
          <DynamicForm />
        </Grid>

        <Grid item xs={12} md={5} >
          <SubmissionsStack />
        </Grid>
      </Grid>
    </Box>
  );
}