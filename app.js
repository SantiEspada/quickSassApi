const express = require('express')
const bodyParser = require('body-parser')
const sass = require('node-sass')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/convert', (req, res) => {
    if(!req.body){
        res.send({
            success: false,
            error: 'No CSS source provided'
        })
    } else {
        try{
            const result = sass.renderSync({
                data: req.body,
                outputStyle: 'compressed',
                sourceMapEmbed: true
            }).css.toString()

            res.send({
                success: true,
                result
            })
        } catch(error){
            res.send({
                success: false,
                error
            })
        }
    }
})

app.get('/', (req, res) => {
    res.send({
        success: true,
        status: 'ok'
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})