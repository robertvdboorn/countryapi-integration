import React from "react";
import { Callout } from "@uniformdev/mesh-sdk-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <Callout type="success">The RestCountries API integration has been installed successfully.</Callout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Configuring the RestCountries API Integration</h2>
        <p className="text-lg">
          To configure the integration and start using country data in Uniform, please follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Navigate to <strong>Experience &gt; Data Types</strong> in the main navigation above.
          </li>
          <li>
            Click the <strong>Add data type</strong> button in the top-right corner of the page.
          </li>
          <li>
            Select <strong>RestCountries API</strong> as the data source type.
          </li>
          <li>
            Configure your RestCountries API connection by providing the following information:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>RestCountries API Base URL (e.g., https://restcountries.com/v3.1)</li>
            </ul>
          </li>
        </ol>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
        <p>
          If you encounter any issues or have questions about the RestCountries API integration, please refer to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            documentation
          </a>{" "}
          or contact our support team.
        </p>
      </div>
    </div>
  );
}
