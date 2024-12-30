document.getElementById('analyzeButton').addEventListener('click', async () => {
  const date = document.getElementById('datePicker').value;
  if (!date) {
    alert('Proszę wybrać datę.');
    return;
  }

  try {
    const fixturesResponse = await fetch(`/api/fixtures?date=${date}`);
    const fixtures = await fixturesResponse.json();

    const analysisResponse = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fixtures })
    });
    const analysisResults = await analysisResponse.json();

    displayResults(analysisResults);
  } catch (error) {
    alert('Wystąpił błąd podczas analizy.');
  }
});

const displayResults = (results) => {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.className = 'result';
    resultElement.innerHTML = `
      <p>Id meczu: ${result.fixtureId}</p>
      <p>Predykcja: ${result.prediction}</p>
      <p>Pewność: ${(result.confidence * 100).toFixed(2)}%</p>
    `;
    resultsDiv.appendChild(resultElement);
  });
};
