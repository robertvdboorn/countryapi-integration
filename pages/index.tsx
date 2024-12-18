import React from "react";

const Index = () => (
  <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-6 py-12">
    <div className="max-w-3xl text-center space-y-8">
      <h1 className="text-5xl font-extrabold text-green-900">
        RestCountries API Integration for Uniform
      </h1>
      <p className="text-lg text-gray-700">
        Seamlessly connect data from the RestCountries API with Uniform&apos;s
        composable DXP for an engaging and dynamic experience.
      </p>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-green-800">Key Features</h2>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
          <li>Simple setup with user-friendly configuration</li>
          <li>Access detailed country data including names, capitals, and regions</li>
          <li>Effortless integration with Uniform&apos;s Canvas</li>
        </ul>
      </div>
      <p className="text-sm text-gray-500">
        Need assistance? Check out the{" "}
        <a href="#" className="text-green-600 hover:underline">
          official documentation
        </a>{" "}
        or contact our support team.
      </p>
    </div>
  </main>
);

export default Index;