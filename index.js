require('dotenv').config();
var app = require('./app.js')
const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        console.log(`servidor OK : http://localhost:${PORT}`);
    })
} catch (error) {
  console.error(`Error al iniciar el servidor: ${error.message}`);
}

module.exports = app;
