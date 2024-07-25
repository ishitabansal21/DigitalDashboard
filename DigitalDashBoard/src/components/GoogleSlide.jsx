import React from "react";

function GoogleSlide() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-4 bg-indigo-100 text-indigo-800">
        Google Slide
      </h2>
      <div className="p-4">
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vTiTRBgggf9xawt0RiXNpM7BDSL7W10jMnIwhIORokL8th56_OY6q-w_Morpq5_-4jeFJdLgmtRK5_x/embed?start=true&loop=true&delayms=3000"
          width="960"
          height="569"
          allowFullScreen="true"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default GoogleSlide;
