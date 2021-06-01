const express = require('express');
const hbs = require('express-handlebars')
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({
    extended: false   
}))

//handlebars config
app.engine(
    '.hbs',
    hbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: ".hbs"
    }))
  
    
     const transporter = nodemailer.createTransport({
         host:'smtp.gmail.com', 
         port: 465,
         secure: true, 
         auth: {
         user: process.env.MAIL_USER, 
         pass: process.env.MAIL_PASS 
         }
     });
        transporter.verify().then(()=> {
         console.log('Correo listo para enviar');
    });

    app. get ('/', (req, res)=>{
        res.render('home',{
            ruta:"/macdalystyle/Karibeño.css"
        });
    })

    app.post ('/formulario', async(req, res)=>{
         // send mail with defined transport object
        await transporter.sendMail({
        from: process.env.MAIL_USER, // sender address
        to:process.env.MAIL_USER, // list of receivers
        subject: `${req.body.fullname} Requere de su atención sobre ${req.body.asunto}`, // Subject line
        html: `<h1>Nombre:${req.body.fullname}</h1>
            <h1>Correo:${req.body.email}</h1>
            <h1>Telefono:${req.body.phone}</h1>
            <h1>Empresa:${req.body.empresa}</h1>
            <h1>Solicita la siguiente información:</h1>
        <h1>${req.body.message}</h1>` // html body
      });
        console.log('Mensaje enviado...');
        res.redirect('/');
    })
    

    app.get ('/formulario',(req, res)=>{
        res.render('formulario',{
            ruta:'/macdalystyle/formulario.css'
        });
    })
    
    app.get ('/images',(req, res)=>{
        res.render('images',{
            ruta:'/macdalystyle/images.css'
        })
    })
 
    app.use((req, res)=>{
        res.render('404');
    });

    app.listen(port, ()=>{
        console.log(`Server running on http://localhost:${port}`)
    })