import aws from 'aws-sdk'
import express from "express"

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const folder = process.env.PWD || __dirname

aws.config.update({region: 'us-west-2'})

const sqs = new aws.SQS()

app.use(express.static(folder))
app.use(express.json())

app.post('/users', (req, res) => {
    sqs.sendMessage({
        MessageBody: "Criar usuário",
        QueueUrl: "https://sqs.us-west-2.amazonaws.com/975050371362/teste-rotaexata"
    },
    (error, data) => {
        if (error) {
            console.log("Erro", error)
        } else {
            console.log("Sucesso!", data.MessageId)
        }
    })

})

app.listen(3000, () => {
    console.log("http://localhost:3000")
});