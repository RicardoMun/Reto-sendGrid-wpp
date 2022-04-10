const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT
require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const email = require('./mail')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

client.messages
  .create({
     body: 'Prueba de twilio. Hola Ricardo :)',
     from: '+12189356135',
     to: '+573234993426'
   })
  .then(message => console.log(`Mensaje enviado ${message.sid}`));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (res, req) => {
  res.json({message: 'Success'})
})

app.listen(port, () => {
  console.log(`Accede al sitio web dando click aquí: http://localhost:${port}`)

})

app.post('/api/email/confirmacion', async(req, res, next) =>{
  try{
    res.json(await email.sendOrder(req.body))
  }catch(err){
    next(err)
  }
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message': error.message})
  return
})

function getMessage(){
  const body = 'Mensaje enviado el 13/2/2022 9:10 a.m'
  return {
    to: 'ricardo.munozm@autonoma.edu.co', // Change to your recipient
  from: 'ricardo.munozm@autonoma.edu.co', // Change to your verified sender
  subject: 'Este es un correo de prueba enviado por sengrid desde mi proyecto',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  <div class="container section">
    <label>Paisaje</label>
    <img src="https://locuraviajes.com//wp-content/uploads/2014/05/los-10-mejores-paisajes-del-mundo-parque-nacional-banff-600x375.jpg">
    <img src="https://imanesdeviaje.com/wp-content/uploads/2020/03/paisajes-mas-bonitos-del-mundo-canada-1.jpg">
  </div>
  </body>
  </html>`
  }
}

async function sendEmail() {
  try{
    await sgMail.send(getMessage())
    return {message: 'Correo enviado'}
  }catch(err){
    const message = 'No se pudo enviar el correo'
    console.error(message)
    console.error(err)
    if (err.response) console.error(err.response.body)
      return {message}
  }
}

(async() =>{
  console.log('Enviando correo electrónico')
  await sendEmail()
})