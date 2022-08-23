const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {success, error, getIndex} = require('./functions')
const e = require("express");
const app = express()
const config = require("./config")

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

let MembersRouter = express.Router()
let PublicationsRouter = express.Router()


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MembersRouter.route('/:id')

    // Supprime un membre avec son id
    .delete((req, res) => {
        let index = getIndex(req.params.id, members);

        if (typeof (index) == 'string') {
            console.log('ici');
            res.json(error(index));
        } else {
            members.splice(index, 1);
            res.json(success(members));

        }
    })


    // récupère un membre avec son id
    .get((req, res) => {

        let index = getIndex(req.params.id, members);

        if (typeof(index) == 'string') {
            res.json(error(index));
        } else {
            res.json(success(members[index].name));
        }
    })

    // modifie un membre avec son id
    .put((req, res) => {
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

MembersRouter.route('/')

    // récupération de tous les membres
    .get((req, res) => {
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

    // Ajoute un membre
    .post((req, res) => {

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


PublicationsRouter.route("/:id")

    // Récupère une publication avec son id
    .get( (req, res) => {
        let index = getIndex(req.params.id, members)

        if (typeof(index) == 'string') {
            res.json(error(index));
        } else {
            res.json(success(publication[index].title));
        }
    })


PublicationsRouter.route('/')

    // Récupère toutes les publications
    .get((req, res)=> {
        res.json(success(publication));
    })





app.use(config.rootAPI +'members', MembersRouter)
app.use(config.rootAPI + 'publications', PublicationsRouter)

app.listen(config.port, () => console.log('Started on port' + config.port)
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

