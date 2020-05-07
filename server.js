const app = require('./app');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log('  App is running at http://localhost:%d', PORT);
  console.log('  Press CTRL-C to stop\n');
});
