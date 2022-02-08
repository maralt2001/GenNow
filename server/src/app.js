
const express = require('express')
const path = require('path');

const app = express();

const pathWithoutDocker = '../client/build';
const pathWithDocker = './client/build'

app.use(express.static(pathWithDocker));

app.get('*', (req, res) => {
    let resolvePath = path.resolve(pathWithDocker);
    res.sendFile(resolvePath, 'index.html')
    
});

const PORT = process.env.PORT || 5000;

console.log('server started on port:',PORT);
app.listen(PORT);


