const app = require('./server');
const PORT = 5012;
const path = require('path');
require('dotenv').config();

app.listen(PORT, () => {
  console.log('server is running on ' + PORT);
});
