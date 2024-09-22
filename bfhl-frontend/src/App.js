import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, Chip, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const MultiFilterComponent = () => {
  const [inputData, setInputData] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState(null);

  const filters = ['Numbers', 'Alphabets']; // Define available filters

  // Handle API input change
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  // Handle filter selection change
  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(typeof value === 'string' ? value.split(',') : value);
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      // Sanitize input data to replace curly quotes with straight quotes
      const sanitizedInput = inputData.replace(/“|”/g, '"').replace(/‘|’/g, "'");
      
      // Parse the sanitized input
      const parsedData = JSON.parse(sanitizedInput);
  
      // Send input data to your backend API
      const response = await axios.post('https://bajajj-hkqx.onrender.com/bfhl', parsedData);
      
      // Get data from API response
      const { numbers, alphabets } = response.data;
  
      // Apply filter
      const filteredData = selectedFilters.map(filter => {
        if (filter === 'Numbers') {
          return `Numbers: ${numbers.join(', ')}`;
        }
        if (filter === 'Alphabets') {
          return `Alphabets: ${alphabets.join(', ')}`;
        }
        return null;
      }).filter(Boolean).join('\n');
  
      setFilteredResponse(filteredData);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };
  return (
    <div>
      {/* API Input */}
      <TextField
        label="API Input"
        value={inputData}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {/* Multi Filter */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Multi Filter</InputLabel>
        <Select
          multiple
          value={selectedFilters}
          onChange={handleFilterChange}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {filters.map((filter) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtered Response */}
      {filteredResponse && (
        <div>
          <h4>Filtered Response</h4>
          <pre>{filteredResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default MultiFilterComponent;