import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import formSchema from '../schema/formSchema.json';
import { submitForm } from '../services/api';

export function DynamicForm() {
  const { fields, title } = formSchema;

  // Build initial values
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  //Yup validation schema
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      let validator = null;

      if (field.type === 'email') {
        validator = Yup.string().email('Invalid email');
      } else if (field.type === 'number') {
        validator = Yup.number()
          .typeError('Must be a number')
          .nullable();
        if (field.min !== undefined) {
          validator = validator.min(field.min, `Minimum value is ${field.min}`);
        }
      } else {
        validator = Yup.string();
        if (field.minLength) {
          validator = validator.min(field.minLength, `Minimum ${field.minLength} characters`);
        }
      }

      if (field.required) {
        validator = validator.required('Required');
      }

      acc[field.name] = validator;
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitForm(values);
        console.log("form submited successfully");
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>{title || 'Dynamic Form'}</Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} key={field.name}>
              {field.type === 'dropdown' ? (
                <TextField
                  fullWidth
                  select
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" type="button" onClick={() => formik.resetForm()}>
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
}
