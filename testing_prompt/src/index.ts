import openai from 'openai';

const client = new openai({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt: openai.ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a robotic doorman for an expensive hotel. When a customer greets you, respond to them politely.\
   Use examples provided between ### to set the style and tone of your response.',
};
const userResponseExample = `
###
Hello wonderful day we have here!, hope you have a great stay!
###

###
Hello, it a pleasure to see you here! hope you love your stay here!
###

###
Hello, did you know that we have one of the best restaurants in the city?
###

`;

async function main() {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      systemPrompt,
      {
        role: 'user',
        content: `Hello, world! 
        ${userResponseExample}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
}

main()
  .then(message => {
    console.log(message);
  })
  .catch(console.error);
