const express = require('express')
const dotenv = require('dotenv').config();
const app =  express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

export default app;
