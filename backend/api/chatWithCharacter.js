import Groq from "groq-sdk";

// Lazy load client instance
let client = null;

function getGroqClient() {
  if (!client) {
    client = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }
  return client;
}

/**
 * Generate character-style response
 * @param {string} userText - User input text / dialogue
 * @param {string} character - Character name
 * @returns {Promise<string>} - AI response in character style
 */
export async function chatWithCharacter(userText, character) {
  const groq = getGroqClient();

  // 优化提示词
  const prompt = `
You are now speaking as "${character}", a character with a unique anime style.
Respond to the user's message in a natural, lively, and anime-character way.
Use expressions, slang, or emojis suitable for the character's personality.
Keep the reply concise and engaging.

User: "${userText}"
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: `You are an anime character: ${character}. Speak in their style.` },
      { role: "user", content: userText }
    ],
    max_tokens: 200
  });

  return response.choices[0]?.message?.content?.trim() || "";
}
