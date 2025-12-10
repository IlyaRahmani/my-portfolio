"use client"
import React, { useState, ChangeEvent } from 'react';
import { Upload, Github, ExternalLink, X } from 'lucide-react';
import AppButton from '@/components/AppButton';

interface FormData {
  title: string;
  description: string;
  githubLink: string;
  previewLink: string;
  image: File | null;
}

export default function AdminProjectsForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    githubLink: '',
    previewLink: '',
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

 const validateForm = () => {
  if (!formData.title.trim()) return false;
  if (!formData.description.trim()) return false;
  if (!formData.githubLink.trim()) return false;
  if (!formData.previewLink.trim()) return false;
  return true;
};

const handleSubmit = () => {
  if (!validateForm()) {
    alert("Please fill in all required fields.");
    return;
  }

  console.log("Form submitted:", formData);
  alert("Form submitted!");
};

  return (
    <div className="min-h-screen from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Create Project
          </h1>
          <p className="text-slate-600">
            Add your project details below
          </p>
        </div>

        <div className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Project Image
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-purple-500 transition-all duration-200 hover:bg-purple-50">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded-lg shadow-lg object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
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
                  <div className="flex flex-col items-center space-y-3">
                    <div className="bg-purple-100 p-4 rounded-full">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter your project title"
              className="text-black w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your project..."
              className="text-black w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* GitHub Link */}
          <div className="space-y-2">
            <label htmlFor="githubLink" className="block text-sm font-medium text-slate-700">
              GitHub Repository
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Github className="w-5 h-5 text-slate-400" />
              </div>
              <input
                id="githubLink"
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className="text-black w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Preview Link */}
          <div className="space-y-2">
            <label htmlFor="previewLink" className="block text-sm font-medium text-slate-700">
              Live Preview URL
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <ExternalLink className="w-5 h-5 text-slate-400" />
              </div>
              <input
                id="previewLink"
                type="url"
                name="previewLink"
                value={formData.previewLink}
                onChange={handleChange}
                placeholder="https://your-project.com"
                className="text-black w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
              <AppButton
                type="secondary"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 mt-4"
                onClick={handleSubmit}
              >
                Log in
              </AppButton>

        </div>
      </div>
    </div>
  );
}