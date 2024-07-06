const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const serveIndex = require('serve-index'); // Import serve-index

const app = express();
const port = 4000;

app.use(express.json());

app.use('/tree', serveIndex(path.join(__dirname, '../../..'), { icons: true, hidden:true }));

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
