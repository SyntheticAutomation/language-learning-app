const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to fetch random words
app.get('/api/words', async (req, res) => {
    const languages = ['mandarin', 'hindi', 'swedish', 'french', 'german', 'korean', 'swahili', 'gaelic', 'irish', 'thai', 'yoruba', 'zulu', 'tagalog', 'ukrainian', 'polish', 'czech', 'vietnamese', 'malay', 'arabic', 'finnish', 'punjabi', 'amharic', 'greek', 'burmese', 'lingala', 'portuguese', 'russian', 'cantonese', 'welsh', 'hungarian', 'japanese', 'persian', 'farsi', 'urdu', 'bengali', 'marathi', 'telugu', 'turkish', 'hausa', 'italian', 'indonesian', 'igbo', 'tamil'];

    // Pick 5 random languages
    const selectedLanguages = [];
    while (selectedLanguages.length < 5) {
        const randomIndex = Math.floor(Math.random() * languages.length);
        const language = languages[randomIndex];
        if (!selectedLanguages.includes(language)) {
            selectedLanguages.push(language);
        }
    }

    // Fetch words (dummy data for now)
    const words = selectedLanguages.map(language => ({
        language,
        words: [
            'word1',
            'word2',
            'word3'
        ] // Replace this with actual API call to fetch words
    }));

    res.json(words);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
