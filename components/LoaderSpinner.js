import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-carpetMoss"></div>
    </div>
  );
};

export default LoaderSpinner;
