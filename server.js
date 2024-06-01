require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Function to fetch words from an API
const fetchWordsFromAPI = async (language) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.example.com/words?language=${language}&limit=1000`; // Replace with actual API URL
    try {
        const response = await axios.get(apiUrl, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        return response.data.words.slice(0, 3); // Get the first 3 words
    } catch (error) {
        console.error(`Error fetching words for ${language}:`, error);
        return ['word1', 'word2', 'word3']; // Fallback to dummy data
    }
};

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

    // Fetch words for each selected language
    const words = await Promise.all(selectedLanguages.map(async (language) => {
        const wordList = await fetchWordsFromAPI(language);
        return { language, words: wordList };
    }));

    // Log the words to a file
    const logEntry = {
        date: new Date().toISOString(),
        words,
    };
    fs.appendFileSync('word_log.json', JSON.stringify(logEntry, null, 2) + ',\n', 'utf8');

    res.json(words);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});