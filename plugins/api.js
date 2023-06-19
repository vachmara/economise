const { Configuration, OpenAIApi } = require("openai");
const system = require("@/assets/system.js")
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const generateRecipe = async (ingredients) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1.17,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        messages: [
            { 
                "role": "system", 
                "content": system.prompt
            }, 
            { 
                role: "user", 
                content: ingredients 
            }
        ],
    });

    console.log(completion);
    return completion.data?.choices[0]?.message;
}