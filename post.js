const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');

openai.prompt = "chatbot: ";
openai.max_tokens = 100;
openai.temperature = 0.5;

const app = express();

app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  const { text } = req.body;

  openai.completions({
    engine: "text-davinci-002",
    prompt: text,
    max_tokens: openai.max_tokens,
    temperature: openai.temperature,
  }).then(response => {
    const reply = response.choices[0].text;

    // You can add any additional processing or validation here, such as sentiment analysis, filtering offensive language, etc.

    res.json({
      reply: reply
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
