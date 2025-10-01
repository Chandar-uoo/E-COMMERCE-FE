// Simple Custom Toast - Light Theme
export const CustomToast = ({ show, message, onOk, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay - very light dim */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Toast box - better dimensions */}
      <div className="relative bg-white rounded-lg shadow-2xl p-8 w-96 mx-4 border border-gray-200">
        <div className="text-center">
          {/* Message */}
          <p className="text-gray-800 text-lg mb-6 font-medium leading-relaxed">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium border border-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              onClick={onOk}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium shadow-md hover:shadow-lg"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};