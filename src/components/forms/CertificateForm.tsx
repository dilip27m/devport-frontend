"use client";

import React from "react";

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({
  certifications,
  onChange,
}) => {
  const addCertification = () => {
    onChange([...certifications, { name: "", issuer: "", date: "" }]);
  };

  const updateCertification = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    const updated = [...certifications];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <button
          type="button"
          onClick={addCertification}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          + Add Certification
        </button>
      </div>

      {certifications.map((cert, index) => (
        <div
          key={index}
          className="border rounded p-3 space-y-2 bg-white shadow-sm"
        >
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => updateCertification(index, "name", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Issuer (e.g., Coursera, AWS)"
            value={cert.issuer}
            onChange={(e) => updateCertification(index, "issuer", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={cert.date}
            onChange={(e) => updateCertification(index, "date", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => removeCertification(index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;
