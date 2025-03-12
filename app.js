const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')

const moviesRouter = require('./routers/movies');

const imagePathMiddleware = require("./middlewares/imagePath");

// Importo il middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");

// // Importo il middleware di gestione errore not found
const notFound = require("./middlewares/notFound");



// Definizione d'uso di una cartella per i file statici
app.use(express.static('public'));

app.use(express.json());
app.use(cors({ origin: process.env.FE_APP }));

app.use(imagePathMiddleware);

// Definizone di rotta home
app.get('/api', (req, res) => {
    res.send('Rotta Home della Movies Webapp');
});

// Utilizziamo le rotta definendo la parte iniziale delle rotte
app.use("/api/movies", moviesRouter)

// Utilizzo il middleware di gestione errore server
app.use(errorsHandler);

// // Utilizzo il middleware di gestione errore 404 not found
app.use(notFound);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
});