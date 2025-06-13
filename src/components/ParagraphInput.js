"use client";
import { useState } from "react";

export default function ParagraphInput() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted paragraph:", text);
    // do something with the text here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <label className="block mb-2 text-lg font-medium text-gray-700">
        Enter your paragraph
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="6"
        placeholder="Write something..."
        value={text}
        onChange={handleChange}
      ></textarea>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
