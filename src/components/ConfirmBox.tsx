"use client";

import React from "react";
import { motion } from "framer-motion";

interface ConfirmBoxProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmBox({ message, onConfirm, onCancel }: ConfirmBoxProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-5 rounded-xl shadow-xl w-[90%] max-w-sm"
      >
        <p className="text-gray-800 text-sm mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-1 rounded-full text-sm text-gray-600 border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 rounded-full text-sm text-white bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
