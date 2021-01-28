import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`w-full py-2 text-white rounded-lg hover:opacity-90 text-lg font-medium focus:outline-none transition-colors ${
      canClick ? "bg-blue-600" : "bg-blue-300 pointer-events-none"
    }`}
  >
    {loading ? `${actionText}...` : actionText}
  </button>
);
