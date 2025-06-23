"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import CategoriesDropdown from "@/components/forms/CategoriesDropdown";

const categories = ["Singer", "Dancer", "DJ", "Speaker"];
const languages = ["Hindi", "English", "Punjabi", "Tamil"];
const feeRanges = [
  "₹20,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1L - ₹2L",
  "₹2L+",
];

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
  location: Yup.string().required("Location is required"),
  fee: Yup.string().required("Fee range is required"),
  categories: Yup.array().min(1, "At least one category is required"),
  languages: Yup.array().min(1, "Select at least one language"),
});

type FormValues = {
  name: string;
  bio: string;
  location: string;
  fee: string;
  categories: string[];
  languages: string[];
  image?: FileList;
};

export default function ArtistForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      location: "",
      fee: "",
      categories: [],
      languages: [],
      image: undefined,
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const selectedCategories = watch("categories") ?? [];
  const selectedLanguages = watch("languages") ?? [];

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        id: Date.now(),
        name: data.name,
        bio: data.bio,
        location: data.location,
        fee: data.fee,
        categories: data.categories,
        languages: data.languages,
        imageName: data.image?.[0]?.name || null,
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      console.log("✅ Submitted to mock API:", await response.json());
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("Something went wrong.");
    }
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setValue(
        "languages",
        selectedLanguages.filter((l) => l !== lang)
      );
    } else {
      setValue("languages", [...selectedLanguages, lang]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white text-black p-6 rounded-lg shadow-md space-y-6 max-w-2xl mx-auto"
    >
      {/* Name */}
      <div>
        <label className="font-medium">Name</label>
        <input
          {...register("name")}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

      {/* Bio */}
      <div>
        <label className="font-medium">Bio</label>
        <textarea
          {...register("bio")}
          rows={4}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.bio?.message}</p>
      </div>

      {/* Location */}
      <div>
        <label className="font-medium">Location</label>
        <input
          {...register("location")}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.location?.message}</p>
      </div>

      {/* Fee Range */}
      <div>
        <label className="font-medium">Fee Range</label>
        <select
          {...register("fee")}
          className="w-full mt-1 border rounded px-3 py-2"
        >
          <option value="">Select Fee Range</option>
          {feeRanges.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm">{errors.fee?.message}</p>
      </div>

      {/* Category Dropdown */}
      <div>
        <CategoriesDropdown
          label="Categories"
          options={categories}
          selected={selectedCategories}
          onChange={(vals: string[]) => setValue("categories", vals)}
          error={errors.categories?.message}
        />
      </div>

      {/* Languages Checkboxes */}
      <div>
        <label className="font-medium">Languages Spoken</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang)}
                onChange={() => toggleLanguage(lang)}
              />
              {lang}
            </label>
          ))}
        </div>
        <p className="text-red-500 text-sm">{errors.languages?.message}</p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="font-medium">Profile Image (Optional)</label>
        <input type="file" {...register("image")} className="mt-1" />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition cursor-pointer mt-3"
        >
          Submit
        </button>
      </div>

      {/* Success Message */}
      {submitted && (
        <p className="text-green-600 mt-4">
          🎉 Form submitted successfully (mock API)
        </p>
      )}
    </form>
  );
}
