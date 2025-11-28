"use client";

export default function AuthError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Ocurrió un error</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
