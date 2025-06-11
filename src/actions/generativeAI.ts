'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";


export const generateCreativePrompt = async (userPrompt: string) => {
    const apiKey: any = process.env.GEMINI_API;
        const genAI = new GoogleGenerativeAI(apiKey);
    const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
    The outline should consist of at least 6 point, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic.
    Return the output in the following JSON format:
    
    {
        "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
        ]
    }
    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.     
    `

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(finalPrompt);
        if(result.response.text())  {
            try {
                const jsonResponse = JSON.parse(result.response.text())

            }  catch (error) {

            }
        }
        return result.response.text()

    } catch (err) {

    }
}