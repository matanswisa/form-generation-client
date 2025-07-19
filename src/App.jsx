import './App.css'
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DynamicForm } from './components/DynamicForm'
import SubmissionsStack from './components/SubmissionsStack';
import formSchemas from "./schema/formSchema.json";
import { useState } from 'react';

export default function App() {
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);

  const handleChange = (event) => {
    setSelectedFormIndex(event.target.value);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Form Generator App
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Form</InputLabel>
        <Select
          value={selectedFormIndex}
          label="Select Form"
          onChange={handleChange}
        >
          {formSchemas.map((form, index) => (
            <MenuItem key={form.formName} value={index}>
              {form.formName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <DynamicForm schema={formSchemas[selectedFormIndex]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SubmissionsStack />
        </Grid>
      </Grid>
    </Box>
  );
}
