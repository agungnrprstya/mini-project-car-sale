import React from "react";

function Modal({ selectedImage, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="max-w-screen-xl p-4">
        <div className="bg-white rounded-lg p-4 relative">
          <img src={selectedImage} className="object-cover max-h-screen max-w-full" />
          <button onClick={closeModal} className="absolute top-[2rem] right-[2rem] bg-red-500 font-bold px-2 rounded-full text-white cursor-pointer">
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
