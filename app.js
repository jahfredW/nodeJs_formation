const express = require('express')
const morgan = require('morgan')
const app = express()

/*middleware : fonction qui va être lue au moment où il y a une requête,
quelque soit cette requête, va s'exécuter avant tout le reste */

const members = [
    {
        id: 1,
        name: 'Fred'
    },
    {
        id: 2,
        name: 'Philippine'
    },
    {
        id: 3,
        name: 'Vero'
    },
]


app.use(morgan('dev'))

// récupération via :id
app.get('/api/v1/members/:id', (req, res) => {
    res.send(members[(req.params.id) - 1]['name'])
})

// récupération de tous les membres, utilisation de query -> correspond à url ?<data>
app.get('/api/v1/members', (req, res) => {
    if (req.query.max !== undefined && req.query.max > 0) {
        res.send(members.slice(0, req.query.max))
        // slice renvoie une portion de l'array, entre indice et indice -1
    }
    /*  arr.slice()
        arr.slice(début)
           arr.slice(début, fin)*/
    res.send(members)
})


app.listen(8080, () => console.log('Started on port 8080')
);