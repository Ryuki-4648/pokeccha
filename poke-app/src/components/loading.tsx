import React from "react";

const Loading = () => {
  return (
    <div className="loading h-full w-full">
      <div className="absolute z-10 left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2" >
        <p className="mb-10 tracking-widest text-xl text-font-color02">pokeccha!</p>
        <div 
          className="
          relative
          loading-border
          h-1.5
          w-24
        bg-white
          overflow-hidden
          before:[''] before:absolute
          before:bg-font-color01
          before:h-1.5
          before:w-24">
        </div>
      </div>
    </div>
  );
};

export default Loading;
