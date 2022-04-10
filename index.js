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