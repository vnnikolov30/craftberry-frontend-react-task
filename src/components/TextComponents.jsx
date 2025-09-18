import React from "react";
import { Link } from "react-router-dom";
function TextComponents({title, paragraph, callToAction, graphic}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        <img
          src={graphic}
          alt="graphic"
          className="w-full h-full object-cover brightness-50"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="font-zalando text-[40px] text-white leading-[1.1] max-w-[40%]">
            {title}
          </h1>
          <p className=" font-roboto font-light text-white text-[15px] mt-4 max-w-[19%] leading-[1.2]">
            {paragraph}
          </p>
          <Link
            to="/question/1"
            className="mt-6 w-[174px] h-[47px] leading-[47px] bg-[#C3EDFF] text-black font-roboto font-medium rounded-lg hover:opacity-90 transition text-center"
          >
            {callToAction}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TextComponents;
