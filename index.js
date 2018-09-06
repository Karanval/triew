const express = require('express')
const app = express()
const port = 3000

/*app.get('/', (request, response) => {
  response.send('Hello from Express!')
})*/
 
app.use(express.static('public'));
 
app.listen(3000);