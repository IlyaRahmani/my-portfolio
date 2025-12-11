"use client";
import React, { useState, ChangeEvent } from "react";
import { Upload, Github, ExternalLink, X } from "lucide-react";
import AppButton from "@/components/AppButton";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
  title: string;
  description: string;
  githubLink: string;
  previewLink: string;
  image: File | null;
}

export default function AdminProjectsForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    githubLink: "",
    previewLink: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return false;
    if (!formData.description.trim()) return false;
    if (!formData.githubLink.trim()) return false;
    if (!formData.previewLink.trim()) return false;
    return true;
  };

  const handleSubmit = async () => {
  if (!validateForm()) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    let imageUrl = null;

    // 1️⃣ Upload image if user selected one
    if (formData.image) {
      const file = formData.image;
      const fileName = `${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-images") // bucket name (create it in Supabase)
        .upload(fileName, file);

      if (uploadError) {
        console.error(uploadError);
        alert("Image upload failed.");
        return;
      }

      // Generate public URL
      const { data: publicUrlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 2️⃣ Insert new row into projects table
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title: formData.title,
          description: formData.description,
          image_url: imageUrl,
          github_url: formData.githubLink,
          live_url: formData.previewLink,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Failed to add project.");
      return;
    }

    alert("Project created successfully!");
    console.log("Inserted:", data);

    // Optional: Clear the form
    setFormData({
      title: "",
      description: "",
      githubLink: "",
      previewLink: "",
      image: null,
    });
    setImagePreview(null);

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }


    console.log("Form submitted:", formData);
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-[#0d0d0d] transition-colors">

      {/* Large, responsive card */}
      <div
        className="
        w-full max-w-3xl 
        p-10 
        rounded-2xl 
        border border-white/20 dark:border-white/10 
        bg-white/30 dark:bg-black/30 
        shadow-2xl 
        backdrop-blur-xl
        transition-all duration-300
      "
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold  text-blue-600 dark:text-blue-300">
            Create New Project
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            Add your project details below
          </p>
        </div>

        <div className="space-y-8">
          {/* IMAGE UPLOAD */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Project Image
            </label>

            <div className="
                border-2 border-dashed 
                border-gray-300 dark:border-gray-600 
                rounded-xl 
                p-6 text-center 
                hover:border-purple-500 
                hover:bg-purple-500/10 
                transition-all
              ">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-60 mx-auto rounded-xl shadow-xl object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-purple-200 dark:bg-purple-900 p-4 rounded-full">
                      <Upload className="w-8 h-8 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG, up to 10MB
                      </p>
                    </div>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="
              w-full px-4 py-3 
              rounded-xl
              bg-white dark:bg-black/40
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-purple-600
              outline-none transition-all
            "
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your project..."
              className="
              w-full px-4 py-3 
              rounded-xl
              bg-white dark:bg-black/40
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-purple-600
              outline-none transition-all
              resize-none
            "
            />
          </div>

          {/* GITHUB LINK */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              GitHub Repository <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/user/repo"
                className="
                w-full pl-12 pr-4 py-3 
                rounded-xl
                bg-white dark:bg-black/40
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-purple-600
                outline-none transition-all
              "
              />
            </div>
          </div>

          {/* PREVIEW LINK */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Live Preview URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                name="previewLink"
                value={formData.previewLink}
                onChange={handleChange}
                placeholder="https://your-project.com"
                className="
                w-full pl-12 pr-4 py-3 
                rounded-xl
                bg-white dark:bg-black/40
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-purple-600
                outline-none transition-all
              "
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <AppButton
            onClick={handleSubmit}
            className="
            w-full 
            font-semibold 
            py-4 rounded-xl 
            transition-all duration-200 
            shadow-lg hover:shadow-xl 
            active:scale-[0.98]
          "
          >
            Create Project
          </AppButton>
        </div>
      </div>
    </div>
  );
}