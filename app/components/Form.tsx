/* eslint-disable @next/next/no-img-element */
"use client";
import openai from "@/utils/constant";
import React, { useState } from "react";
import Loading from "./Loading";
const App = () => {
  const [inputText, setInputText] = useState("");
  const [imgUrl, setImgUrl] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>("");

  const submit = async (event: any) => {
    event.preventDefault();
    if (inputText) {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await openai.images
          .generate({
            prompt: inputText,
            n: 1,
            size: "1024x1024",
          })
          .catch((err) => {
            setIsError(true);
            setError(err);
          });

        setIsLoading(false);
        setImgUrl(response?.data[0].url);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    } else {
      alert("type something");
    }
  };

  return (
    <div className="space-y-[50px]">
      <div className="md:w-[500px] w-full">
        <h1 className="text-3xl mb-4">Image Generator</h1>
        <form className="flex items-center gap-3" onSubmit={submit}>
          <input
            type="text"
            name="prompt"
            id="prompt"
            className="w-full border border-gray-400 rounded-md outline-none p-2 font-light"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here"
          />
          <button
            type="submit"
            className="bg-gray-500 p-2 rounded-md text-white transition-all hover:bg-transparent hover:text-black border border-gray-500"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Submit"}
          </button>
        </form>
      </div>
      <div
        className={`md:max-w-[768px] min-h-[350px] ${
          isError ? "border-red-500" : ""
        } border text-center flex items-center justify-center rounded`}
      >
        {isLoading ? (
          <Loading />
        ) : imgUrl ? (
          <img
            src={imgUrl}
            alt="Generated Image"
            className="w-full object-contain h-full"
          />
        ) : isError ? (
          <p className="p-4 font-mono text-red-600">{error.toString()}</p>
        ) : (
          <p className="p-4 font-mono">
            The generated image will be displayed here
          </p>
        )}
      </div>
      {imgUrl && (
        <a
          href={imgUrl}
          download
          target="_blank"
          className="w-full px-3 py-2 bg-gray-600 text-white mt-5 inline-block text-center rounded-md transition-all hover:bg-transparent hover:text-black border hover:border-red-500"
        >
          Download Image
        </a>
      )}
    </div>
  );
};

export default App;
