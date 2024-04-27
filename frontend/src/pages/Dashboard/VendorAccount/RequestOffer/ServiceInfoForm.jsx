import React, { useState } from "react";

export default function ServiceInfoForm({
  onNext,
  onPrevious,
  onFinish,
  isLastStep,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  //todo DRY conflict -> it is already declared in parent

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleNext = (e, type) => {
    onNext(formData);

    // If it's the last step, trigger onFinish
    if (isLastStep) {
      onFinish(e, type);
    }
  };

  return (
    <div>
      <form className="px-1 onboarding-flow-children    ">
        <div className="mb-4">
          <label htmlFor="formServiceType" className="block">
            Type of your Service request
          </label>
          <input
            id="formServiceType"
            type="text"
            placeholder="Enter the type of the requested service"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full  py-3 border-b  border-solid  focus:outline-none
              text-[16px] leading-7 text-headingColor
              placeholder:text-textColor  cursor-pointer"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="formProblemDescription" className="block mb-2">
            Describe the problem
          </label>
          <textarea
            id="formProblemDescription"
            style={{ height: "200px" }}
            placeholder="Describe your problem in short details"
            name="description"
            onChange={handleChange}
            value={formData.description}
            className=" form-textarea w-full  rounded p-3 border border-solid 
            focus:shadow-outline text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer"
          />
        </div>
      </form>

      <div className="flex justify-between">
        <span>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={onPrevious}
          >
            Previous
          </button>
        </span>

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
