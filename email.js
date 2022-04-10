const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEYII)


function sendEmailConfirmationHTML(customerName, orderNumber) {
  return `<!DOCTYPE html>
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

function getMessage(emailParams) {
  return {
    to: 'emailParams.toEmail', // Change to your recipient
    from: 'ricardo.munozm@autonoma.edu.co', // Change to your verified sender
    subject: 'Este es un correo de prueba enviado por sengrid desde mi proyecto',
    text: `Hola ${emailParams.customerName}, te enviamos un hermoso paisaje`,
    html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNumber)
  }

}

async function sendOrder(emailParams){
  try{
    await sgMail.send(getMessage(emailParams))
    return {message: 'Confirmación de compra enviada'}
  }catch(err){
    const message = 'No se pudo envuar la orden de compra'
    console.error(message)
    console.error(err)
    if (err.response) console.error(err.response.body)
      return {message}
  }
}

module.exports = {
  sendOrder
}