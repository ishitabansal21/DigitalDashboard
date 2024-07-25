import React from "react";

function GoogleSheet() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <h2 className="text-2xl font-semibold p-4 bg-indigo-100 text-indigo-800">
        Google Sheet
      </h2>
      <div className="p-4">
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRBfw8H02aSE2oXDGbRa9E254qVVQYS25Xt_IbnnO65F4hlttFn0Z1ccxIq8s70eO13oK0VK5Ha6nH4/pubhtml?widget=true&amp;headers=false"
          width="100%"
          height="600px"
          title="Google Sheet"
        ></iframe>
        <a
          href="https://docs.google.com/spreadsheets/d/19PvpE2dyYKMnRWP7xngn8mirs3unnWp3PYMqOrHnJzA/edit?gid=1386834576#gid=1386834576"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-transparent flex items-center justify-center text-indigo-800 text-xl font-semibold"
        >
          Click here to view the full Google Sheet
        </a>
      </div>
    </div>
  );
}

export default GoogleSheet;
