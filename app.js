const express = require('express')
const app = express()



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