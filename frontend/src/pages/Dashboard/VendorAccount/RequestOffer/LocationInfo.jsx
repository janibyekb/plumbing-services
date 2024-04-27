import React, { useState } from "react";

import { fetchAddress } from "#lib/utils";
import { BsGeoAlt, BsHouse } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function LocationInfo({
  onNext,
  onPrevious,
  onFinish,
  isLastStep,
}) {
  const [formData, setFormData] = useState({
    location: "",
    preferredDate: null,
  });

  const { currentUser } = useSelector((state) => state.user);

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

  const handleGeoLocation = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(geoSuccess);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              geoSuccess,
              errors,
              options
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  };

  async function geoSuccess(pos) {
    var crd = pos.coords;
    await fetchAddress(crd.latitude, crd.longitude).then((result) => {
      console.log(result);
      setFormData({
        ...formData,
        location: result,
      });
    });

    console.log(formData);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getUserAddress() {
    setFormData({
      ...formData,
      location: currentUser?.address,
    });
  }
  return (
    <>
      <div className="onboarding-flow-children pt-2">
        <div className="flex flex-col gap-3">
          <div className="mb-3">
            <label htmlFor="preferredDate" className="block form__label">
              Preferred Date:
            </label>
            <input
              id="preferredDate"
              className="form__input_regular"
              required
              value={formData.preferredDate}
              type="date"
              name="preferredDate"
              onChange={handleChange}
              // isInvalid={!!errors.pickUpDate}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="block form__label">
              Your current or home location
            </label>
            <div className="relative">
              <input
                id="location"
                className="form__input_regular"
                value={formData.location}
                type="text"
                name="location"
                onChange={handleChange}
                placeholder="Your current or home location"
              />

              <div className="absolute inset-y-0 right-0 rounded-md border  border-gray-300">
                <button
                  className="bg-white  border-r-2   text-gray-700  p-2  my "
                  onClick={getUserAddress}
                >
                  <BsHouse className="h-5 w-5" />
                </button>
                <button
                  className="bg-white  text-gray-700  p-2 "
                  onClick={handleGeoLocation}
                >
                  <BsGeoAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}
