
const express = require('express')
const path = require('path');

const app = express();

app.use(express.static('../client/build'));

app.get('/', (req, res) => {
    let resolevePath = path.resolve('../client/build');
    res.sendFile(resolevePath, 'index.html')
    
});

const PORT = process.env.PORT || 5000;

console.log('server started on port:',PORT);
app.listen(PORT);


