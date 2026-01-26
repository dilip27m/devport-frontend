"use client";

import React, { useState, useRef } from "react";
import { User, X, Camera, Sparkles } from "lucide-react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

import { useAlert } from "@/context/AlertContext";

export interface AboutMeFormProps {
    data: {
        greeting: string;
        name: string;
        role: string;
        bio: string;
        photo: string;
        aboutMe: string;
    };
    onChange: (field: string, value: any) => void;
}

const AboutMeForm: React.FC<AboutMeFormProps> = ({ data, onChange }) => {
    const { upload } = useCloudinaryUpload();
    const { showAlert } = useAlert();
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const safe = {
        greeting: data?.greeting ?? "",
        name: data?.name ?? "",
        role: data?.role ?? "",
        bio: data?.bio ?? "",
        photo: data?.photo ?? "",
        aboutMe: data?.aboutMe ?? "",
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingPhoto(true);
            const url = await upload(file);
            onChange("photo", url);
            e.target.value = ""; // reset input
        } catch (err) {
            console.error(err);
            showAlert("Photo upload failed.", "error");
        } finally {
            setUploadingPhoto(false);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <User size={20} className="text-blue-600" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">About Me</h2>
                    <p className="text-xs text-gray-500">Manage your personal details and bio.</p>
                </div>
            </div>

            {/* TOP SECTION: Photo + Greeting/Name */}
            <div className="flex flex-col md:flex-row gap-4 items-start">

                {/* LEFT: Photo Upload */}
                <div className="shrink-0">
                    <div className="mb-1.5">
                        <span className={labelClass}>Profile Photo</span>
                    </div>
                    <div className="group relative">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />

                        <div
                            onClick={triggerUpload}
                            className={`relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                    ${safe.photo ? "border-transparent shadow-md" : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50"}`}
                        >
                            {safe.photo ? (
                                <>
                                    <img
                                        src={safe.photo}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs">
                                        Change Photo
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                    {uploadingPhoto ? (
                                        <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                                    ) : (
                                        <Camera size={24} className="mb-2" />
                                    )}
                                    <span className="text-xs font-medium">Upload</span>
                                </div>
                            )}
                        </div>

                        {safe.photo && !uploadingPhoto && (
                            <button
                                type="button"
                                onClick={() => onChange("photo", "")}
                                className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-100 hover:bg-red-50 transition-colors z-10"
                                title="Remove photo"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* RIGHT: Greeting & Name */}
                <div className="flex-1 w-full flex flex-col gap-3">
                    {/* Greeting */}
                    <div>
                        <label className={labelClass}>Greeting</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={safe.greeting}
                                onChange={(e) => onChange("greeting", e.target.value)}
                                placeholder="Hey there! I'm"
                                className={`${inputClass}`}
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className={labelClass}>Name</label>
                        <input
                            type="text"
                            value={safe.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            placeholder="Your Full Name"
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Role & Bios */}
            <div className="space-y-4">

                {/* Role */}
                <div>
                    <label className={labelClass}>Role / Title</label>
                    <input
                        type="text"
                        value={safe.role}
                        onChange={(e) => onChange("role", e.target.value)}
                        placeholder="e.g., Full-Stack Developer, UI Designer"
                        className={inputClass}
                    />
                </div>

                {/* Short Bio */}
                <div>
                    <label className={labelClass}>Short Bio (One Liner)</label>
                    <textarea
                        value={safe.bio}
                        onChange={(e) => onChange("bio", e.target.value)}
                        rows={2}
                        placeholder="A quick introduction about who you are..."
                        className={inputClass}
                    />
                </div>

                {/* Detailed About Me */}
                <div>
                    <label className={labelClass}>Detailed About Me</label>
                    <textarea
                        value={safe.aboutMe}
                        onChange={(e) => onChange("aboutMe", e.target.value)}
                        rows={5}
                        placeholder="Share your journey, background, interests, and what drives you..."
                        className={inputClass}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutMeForm;