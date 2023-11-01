import express from 'express'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

router.get('/', async (req, res) => {
    res.send('Hello from DALL-E!')
})

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body
        const gptResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });

        const image = gptResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error)
        res.status(error?.status || 500).json({ message: error.message })
    }
})

export default router