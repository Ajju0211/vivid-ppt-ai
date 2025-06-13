'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";


export const generateCreativePrompt = async (userPrompt: string) => {
    const apiKey: any = process.env.GEMINI_API_KEY;
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
        const response = result.response.text()

        if (response) {
            try {
                const cleanedResponse = response.replace(/```json|```/g, '').trim();
                const responseContent = JSON.parse(cleanedResponse)
                return { status: 200, data: responseContent }
            } catch (err) {
                console.log('Invalid Json received', response)
                return { status: 500, error: "Invalid Json format received from AI" }
            }
        }
        return { status: 400, error: "No content generated" }

    } catch (err) {
        console.log('🔴 ERROR', err)
        return { status: 500, error: 'Internal server error' }

    }
}