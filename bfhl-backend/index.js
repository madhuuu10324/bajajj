const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST method route
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid data format"
        });
    }

    const userId = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const rollNumber = 'ABCD123';

    // Filter numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

    // Find highest lowercase alphabet
    const lowerAlphabets = alphabets.filter(a => a === a.toLowerCase());
    const highestLowercaseAlphabet = lowerAlphabets.length ? [lowerAlphabets.sort().pop()] : [];

    // Simulate file validation (for simplicity)
    const fileValid = file_b64 ? true : false;
    const fileMimeType = "image/png";  // Hardcoded for now
    const fileSizeKb = 400;            // Hardcoded for now

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
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
cd 