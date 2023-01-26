//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

//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

//New id--->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

//Org. id--> org-oyKIXnVJAbSXFJKVKLL8LM70

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-oyKIXnVJAbSXFJKVKLL8LM70",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();
const port = 3080;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message, currentModels } = req.body;
  console.log(message, "message");
  const response = await openai.createCompletion({
    model: `${currentModels}`, //"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  //console.log(response.data.choices[0].text)
  res.json({
    //data:response.data
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Example port listening into http://localhost:${port}`);
});
