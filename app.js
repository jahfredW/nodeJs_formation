const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {success, error, getIndex} = require('./functions')
const e = require("express");
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
        name: 'Sophie'
    },
]

const publication = [
    {
        id: 1,
        owner: members[0].name,
        title: 'Je suis une legende'
    },
    {
        id: 2,
        owner: members[0].name,
        title: 'Je suis une vraie légende'
    },
    {
        id: 3,
        owner: members[2].name,
        title: 'Je ne suis pas une lumière'
    },
]


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.delete('/api/v1/members/:id', (req, res) => {
    let index = getIndex(req.params.id, members);

    if (typeof (index) == 'string') {
        console.log('ici');
        res.json(error(index));
    } else {
        members.splice(index, 1);
        res.json(success(members));

    }

})


// récupération via :id
app.get('/api/v1/members/:id', (req, res) => {

    let index = getIndex(req.params.id, members);

    if (typeof(index) == 'string') {
        res.json(error(index));
    } else {
        res.json(success(members[index].name));
    }
})

app.get('/api/v1/publication/:id', (req, res) => {
    let index = getIndex(req.params.id, members)

    if (typeof(index) == 'string') {
        res.json(error(index));
    } else {
        res.json(success(publication[index].title));
    }
})

app.get('/api/v1/publication', (req, res)=> {
    res.json(success(publication));
})



// récupération de tous les membres, utilisation de query -> correspond à url ?<data>
app.get('/api/v1/members', (req, res) => {
    if (req.query.max !== undefined) {
        if (req.query.max > 0) {
            res.json(success(members.slice(0, req.query.max)))
            // slice renvoie une portion de l'array, entre indice et indice -1
        } else if (req.query.max == 0) {
            res.json(error("c'est pas possible de mettre 0"))
            console.log(typeof (req.query.max));
        } else {
            console.log('ici')
            /*  arr.slice()
                arr.slice(début)
                   arr.slice(début, fin)*/
            res.json(success(members));
        }
    }
    else {
        console.log('la');
        res.json(success(members));
    }
}
)

app.put('/api/v1/members/:id', (req, res) => {
    // recherche de l'index
    let index = getIndex(req.params.id, members);
    // si le retoru est de type string, l'index n'existe pas
    if (typeof(index) == 'string') {
        res.json(error(index));
    } else {

        let same = false

        for (let item of members) {
            if (req.body.name == item.name && req.params.id != item.id) {
                same = true;
                break
            }

            if (same) {
                res.json(error('same name'))
            } else {
                members[index].name = req.body.name;
                res.json(success(true))
            }
        }
    }

})


app.post('/api/v1/members', (req, res) => {

    if (req.body.name) {

        let sameName = false;
        for (let item of members) {
            if (req.body.name === item.name) {
                sameName = true
                break;
            }
        }

        if (sameName) {
            res.json(error('name already exists'))

        } else {
            let member =
                {
                    id: createID(),
                    name: req.body.name
                }

            members.push(member);
            res.json(success(member));

        }}
    else
        {
            res.json(error('no name value'))
        }

})



app.listen(8080, () => console.log('Started on port 8080')
);

/*
let test = "frederic"
console.log(test.split(""))
for (let letter of test.split("")) {
    process.stdout.write(letter);
}
*/

function createID() {
    return members[members.length - 1].id + 1
}

