document.getElementById('submitBtn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;
    const filterSelect = document.getElementById('filterSelect');
    const selectedOptions = Array.from(filterSelect.selectedOptions).map(option => option.value);
    const responseOutput = document.getElementById('responseOutput');
  
    try {
      const data = JSON.parse(jsonInput);
      const response = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      let output = '<h2>Response Data</h2><pre>';
  
      selectedOptions.forEach(option => {
        if (result[option]) {
          output += `${option}: ${JSON.stringify(result[option], null, 2)}\n\n`;
        }
      });
  
      output += '</pre>';
      responseOutput.innerHTML = output;
    } catch (error) {
      responseOutput.innerHTML = '<p style="color: red;">Invalid JSON format or server error</p>';
    }
  });
  