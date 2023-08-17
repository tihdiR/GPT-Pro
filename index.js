
const fetch = require("node-fetch");
const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = ''

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role: "user", content: "hi"}],
            max_tokens: 100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    }  catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))




// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-yYNJ7HfOlNYaFxWcj51ExAhl",
//     apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);
// // const response = await openai.listEngines();