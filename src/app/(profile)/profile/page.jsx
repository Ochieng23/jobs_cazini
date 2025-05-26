"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  // Personal info
  const [personal, setPersonal] = useState({
    firstName: "Erica",
    lastName: "Smith",
    email: "erica.smith@example.com",
    headline: "Product Marketing Manager",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Springfield, USA",
    photo: null,
  });

  // Resume upload
  const [resume, setResume] = useState(null);

  // Education entries
  const [education, setEducation] = useState([
    { id: 1, school: "University of Springfield", field: "Marketing", degree: "BSc", start: "09/2012", end: "06/2016" },
  ]);

  // Experience entries
  const [experience, setExperience] = useState([
    {
      id: 1,
      title: "Senior Marketer",
      company: "Acme Corp",
      industry: "Retail",
      summary: "Led campaigns to increase engagement",
      start: "01/2020",
      end: "Present",
      current: true,
    },
  ]);

  // Summary & cover letter
  const [summary, setSummary] = useState("Accomplished marketing professional with 8+ years of experience.");
  const [cover, setCover] = useState("Dear Hiring Team, I am excited to apply for...");

  // Handlers
  const handlePersonalChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") setPersonal((p) => ({ ...p, photo: files?.[0] || null }));
    else setPersonal((p) => ({ ...p, [name]: value }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  };

  const removeResume = () => setResume(null);

  const addEducation = () =>
    setEducation((e) => [
      ...e,
      { id: Date.now(), school: "", field: "", degree: "", start: "", end: "" },
    ]);

  const removeEducation = (id) => setEducation((e) => e.filter((x) => x.id !== id));

  const updateEducation = (id, field, value) =>
    setEducation((e) => e.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const addExperience = () =>
    setExperience((x) => [
      ...x,
      { id: Date.now(), title: "", company: "", industry: "", summary: "", start: "", end: "", current: false },
    ]);

  const removeExperience = (id) => setExperience((x) => x.filter((y) => y.id !== id));

  const updateExperience = (id, field, value) =>
    setExperience((x) => x.map((y) => (y.id === id ? { ...y, [field]: value } : y)));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ personal, resume, education, experience, summary, cover });
    // Add form validation or API call here
  };

  // Current time-based greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8"
      noValidate
    >
      <h1 className="text-3xl font-bold text-gray-900">
        {greeting}, {personal.firstName}
      </h1>
      <p className="text-gray-600">Update your profile details below.</p>

      {/* Personal Information */}
      <section className="space-y-6 border-b pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-emerald-500 pb-2">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={personal.firstName}
              onChange={handlePersonalChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={personal.lastName}
              onChange={handlePersonalChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personal.email}
              onChange={handlePersonalChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personal.phone}
              onChange={handlePersonalChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
              Professional Headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={personal.headline}
              onChange={handlePersonalChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={personal.address}
              onChange={handlePersonalChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Profile Photo
            </label>
            <div className="mt-1 flex items-center gap-4">
              {personal.photo ? (
                <div className="relative w-24 h-24">
                  <Image
                    src={URL.createObjectURL(personal.photo)}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPersonal((p) => ({ ...p, photo: null }))}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-emerald-500 transition">
                  <Image
                    src="/icons/upload.svg"
                    alt="Upload"
                    width={40}
                    height={40}
                    className="mx-auto mb-2 text-gray-400"
                  />
                  <p className="text-gray-600">Drag & drop or <span className="text-emerald-600 font-medium">browse</span></p>
                  <p className="text-sm text-gray-500 mt-1">(.jpg, .png, max 5MB)</p>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/jpeg,image/png"
                    onChange={handlePersonalChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Upload */}
      <section className="space-y-6 border-b pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-emerald-500 pb-2">
          Profile & Documents
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume <span className="text-sm text-gray-500">(Optional, .pdf, .doc, .docx, .odt, .rtf)</span>
          </label>
          <div className="mt-1 relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-emerald-500 transition">
            {!resume ? (
              <>
                <Image
                  src="/icons/upload.svg"
                  alt="Upload"
                  width={40}
                  height={40}
                  className="mx-auto mb-2 text-gray-400"
                />
                <p className="text-gray-600">Drag & drop your resume or <span className="text-emerald-600 font-medium">browse</span></p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.odt,.rtf"
                  onChange={handleResumeChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/icons/document.svg"
                    alt="Doc"
                    width={24}
                    height={24}
                    className="text-gray-600"
                  />
                  <p className="truncate max-w-xs">{resume.name}</p>
                </div>
                <button
                  type="button"
                  onClick={removeResume}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6 border-b pb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-emerald-500 pb-2">
            Education
          </h2>
          <button
            type="button"
            onClick={addEducation}
            className="text-emerald-600 hover:text-emerald-700 transition"
          >
            + Add
          </button>
        </div>
        {education.map((ed) => (
          <div key={ed.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeEducation(ed.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
            <input
              value={ed.school}
              onChange={(e) => updateEducation(ed.id, "school", e.target.value)}
              placeholder="School"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <input
              value={ed.field}
              onChange={(e) => updateEducation(ed.id, "field", e.target.value)}
              placeholder="Field of study"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              value={ed.degree}
              onChange={(e) => updateEducation(ed.id, "degree", e.target.value)}
              placeholder="Degree"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            <div className="flex gap-4">
              <input
                value={ed.start}
                onChange={(e) => updateEducation(ed.id, "start", e.target.value)}
                placeholder="Start date (MM/YYYY)"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
              <input
                value={ed.end}
                onChange={(e) => updateEducation(ed.id, "end", e.target.value)}
                placeholder="End date (MM/YYYY)"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="space-y-6 border-b pb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-emerald-500 pb-2">
            Experience
          </h2>
          <button
            type="button"
            onClick={addExperience}
            className="text-emerald-600 hover:text-emerald-700 transition"
          >
            + Add
          </button>
        </div>
        {experience.map((exp) => (
          <div key={exp.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
            <input
              value={exp.title}
              onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <input
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              placeholder="Company"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <input
              value={exp.industry}
              onChange={(e) => updateExperience(exp.id, "industry", e.target.value)}
              placeholder="Industry"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            <textarea
              value={exp.summary}
              onChange={(e) => updateExperience(exp.id, "summary", e.target.value)}
              placeholder="Summary"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            <div className="flex gap-4 items-center">
              <input
                value={exp.start}
                onChange={(e) => updateExperience(exp.id, "start", e.target.value)}
                placeholder="Start date (MM/YYYY)"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
              <input
                value={exp.end}
                onChange={(e) => updateExperience(exp.id, "end", e.target.value)}
                placeholder="End date (MM/YYYY)"
                disabled={exp.current}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                I currently work here
              </label>
            </div>
          </div>
        ))}
      </section>

      {/* Summary & Cover Letter */}
      <section className="space-y-6 border-b pb-6">
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Write a brief summary of your experience and skills..."
          />
        </div>
        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            id="cover"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            rows={4}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Write a personalized cover letter for your applications..."
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed"
          disabled={!personal.firstName || !personal.lastName || !personal.email}
        >
          Save Changes
        </button>
        <button
          type="button"
          className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}