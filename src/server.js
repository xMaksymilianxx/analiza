const express = require('express');
const axios = require('axios');
const analysis = require('./analysis');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'ac0417c6e0dcfa236b146b9585892c9a';
const API_URL = 'https://v3.football.api-sports.io';

app.use(express.json());
app.use(express.static('public'));

app.get('/api/fixtures', async (req, res) => {
  try {
    const { date } = req.query;
    const response = await axios.get(`${API_URL}/fixtures`, {
      headers: { 'x-apisports-key': API_KEY },
      params: { date }
    });
    const fixtures = response.data.response;
    res.json(fixtures);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania danych.' });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { fixtures } = req.body;
    const analysisResults = await analysis.performAnalysis(fixtures);
    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas analizy danych.' });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
