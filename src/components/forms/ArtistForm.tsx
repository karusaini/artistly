"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CategoriesDropdown from "@/components/forms/CategoriesDropdown";

const categories = ["Singer", "Dancer", "DJ", "Speaker"];
const languages = ["Hindi", "English", "Punjabi", "Tamil"];
const feeRanges = [
  "₹20,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1L - ₹2L",
  "₹2L+",
];

const schema: Yup.ObjectSchema<FormValues> = Yup.object({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
  location: Yup.string().required("Location is required"),
  fee: Yup.string().required("Fee range is required"),
  categories: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one category is required")
    .required()
    .defined(),
  languages: Yup.array()
    .of(Yup.string().required())
    .min(1, "Select at least one language")
    .required()
    .defined(),
  image: Yup.mixed<FileList>().notRequired(),
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
          headers: { "Content-Type": "application/json" },
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
        <Label>Name</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <Label>Bio</Label>
        <Textarea {...register("bio")} rows={4} />
        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <Label>Location</Label>
        <Input {...register("location")} />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* Fee Range */}
      <div>
        <Label>Fee Range</Label>
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
        {errors.fee && (
          <p className="text-red-500 text-sm mt-1">{errors.fee.message}</p>
        )}
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

      {/* Languages */}
      <div>
        <Label>Languages Spoken</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedLanguages.includes(lang)}
                onCheckedChange={() => toggleLanguage(lang)}
              />
              <span>{lang}</span>
            </label>
          ))}
        </div>
        {errors.languages && (
          <p className="text-red-500 text-sm mt-1">
            {errors.languages.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <Label>Profile Image (Optional)</Label>
        <Input type="file" {...register("image")} />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button type="submit">Submit</Button>
      </div>

      {submitted && (
        <p className="text-green-600 mt-4 text-center">
          🎉 Form submitted successfully (mock API)
        </p>
      )}
    </form>
  );
}
