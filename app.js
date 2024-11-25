const express = require('express')
const app = express()


app.use(express.static('public'));

// app.get('', (request, response) => {
//     response.send('hello')
// })

app.listen(3500, () => {
    console.log("running")
})