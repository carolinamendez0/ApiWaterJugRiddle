const express = require("express");
const app = express();
app.use(express.json());

const jarraRouter = require("./app/routes/jarraRouter.js")

app.use("/", jarraRouter)

app.get("*", (req, res) => {
        return res.status(404).json({ message: 'No se encuentra la ruta solicitada' });
});

module.exports = app;
