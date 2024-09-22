const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Function to filter data
const filterData = (data) => {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');
    const lowerAlphabets = alphabets.filter(a => a === a.toLowerCase());
    const highestLowercaseAlphabet = lowerAlphabets.length ? [lowerAlphabets.sort().pop()] : [];
    
    return { numbers, alphabets, highestLowercaseAlphabet };
};

// POST method route
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Validate input data
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid data format. 'data' must be an array."
        });
    }

    if (file_b64 && typeof file_b64 !== 'string') {
        return res.status(400).json({
            is_success: false,
            message: "Invalid file format. 'file_b64' must be a string."
        });
    }

    const { numbers, alphabets, highestLowercaseAlphabet } = filterData(data);
    
    // Simulate file validation
    const fileValid = file_b64 ? true : false;
    const fileMimeType = "image/png";  // Hardcoded for now
    const fileSizeKb = 400;            // Hardcoded for now

    res.json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

// GET method route
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend API running on port ${port}`);
});