
const express = require('express')
const path = require('path');

const app = express();

const pathWithoutDocker = path.join(__dirname, '../../client/build')

const pathWithDocker = './client/build'

app.use(express.static(pathWithDocker));

app.get('/gennow', (req, res) => {

    let file = path.resolve(pathWithDocker, 'index.html')
    res.sendFile(file)

});

const PORT = process.env.PORT || 5000;

console.log('server started on port:',PORT);
app.listen(PORT);


