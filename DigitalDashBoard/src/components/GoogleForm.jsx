import React from "react";

function GoogleForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-4 bg-indigo-100 text-indigo-800">
        Google Form
      </h2>
      <div className="p-4">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScl9ogPuRlbSbuVBLKVM3U82jSXN4RX6GLaYEzBy6kcT_GW_w/viewform?embedded=true" width="300" height="300" marginheight="0" marginwidth="0">Loading…</iframe>
      </div>
    </div>
  );
}

export default GoogleForm;
