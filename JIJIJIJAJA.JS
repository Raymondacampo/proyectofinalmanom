const express = require('express');
const hbs = require('express-handlebars');
const patch = require('path');
const { dirname } = require('path/posix');

const app = express();

const PORT = process.env.PORT ,ll 4000;

//settings
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(_dirname, "public")));

//handlebars config
app.engine(
    '.hbs',
    hbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: ".hbs"
    })
)