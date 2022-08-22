const express = require('express')
const app = express()

/*middleware : fonction qui va être lue au moment où il y a une requête,
quelque soit cette requête, va s'exécuter avant tout le reste */

/*fonction de debug, affiche l'url en console */
app.use((req, res, next) => {
    console.log('URL :'  + req.url)
    next()
})

app.get('/api', (req, res) => {
    res.send('Root API');
})

app.get('/api/v1', (req, res) => {
    res.send("API version 1");
})


/* paramètres des urls : */
/* :<param> */
app.get('/api/v1/books/:id/:id2', (req, res) => {
    res.send(req.params);
})


app.listen(8080, () => console.log('Started on port 8080')
);