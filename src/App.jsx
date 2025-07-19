import './App.css'
import {
  Box,
  FormControl,
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
    <Box
      display="flex"
      gap={4}
      mt={4}
      sx={{ flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Box flex={1}>
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

        <DynamicForm schema={formSchemas[selectedFormIndex]} />
      </Box>
      <Box flex={0.7}>
        <SubmissionsStack />
      </Box>
    </Box>
  );
}
