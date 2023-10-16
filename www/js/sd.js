{/* <script type="module" src="your-es6-module-file.js"></script> */}

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-IuMJAIzBzapUPslPCf0EQzV2",
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey : 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,
});

const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
image_url = response.data.data[0].url;
console.log(image_url);