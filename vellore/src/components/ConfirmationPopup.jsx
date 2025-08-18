import React from "react";

const ConfirmationPopup = ({ 
  isOpen, 
  title = "Are you sure?", 
  message = "Do you really want to perform this action?", 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 bg-blur z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
