// import { Configuration, OpenAIApi } from "openai";

import openai from "../../utils/constant";

export default async function handler(req: any, res: any) {
  if (!req.body.prompt)
    return res
      .status(400)
      .json({ message: "Pass in prompt field for image generation" });
  const response = await openai.images.generate({
    prompt: req.body.prompt,
    n: 1,
    size: "1024x1024",
  });

  if (!response.data) throw new Error("Unable to get image");
  console.log("received url " + response.data);

  res.status(200).json({ imageURL: response.data[0].url });
}
