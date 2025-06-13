"use client";
import { useState } from "react";

export default function LoginPage() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    console.log("Dish Name:", dishName);
    console.log("Ingredients:", ingredients);
    console.log("Steps:", steps);
    console.log("Image selected:", image);

    // Do something with the form data here (e.g. send to API)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full m-[5vw]">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
          {/* Image Input */}
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Upload an image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-contain rounded border"
              />
            </div>
          )}

          {/* Dish Name */}
          <label className="block mt-6 mb-1 font-medium text-gray-700">Dish Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />

          {/* Ingredients */}
          <label className="block mt-6 mb-2 text-lg font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="List your ingredients..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>

          {/* Steps */}
          <label className="block mt-6 mb-2 text-lg font-medium text-gray-700">
            Steps
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Describe the steps..."
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
