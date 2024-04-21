import { useState } from "react";
import ControlledOnboardingFlow from "./ControlledOnboardingFlow";
import { useLocation, useNavigate } from "react-router-dom";
import defaultImg from "#styles/default.png";
import axios from "axios";
import { BACKEND_PATH } from "#lib/utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import _ from "lodash";
import LocationInfo from "./LocationInfo";
import UploadImageForm from "./UploadImageForm";
import ServiceInfoForm from "./ServiceInfoForm";
import { uploadImageToCloudinary } from "#lib/uploadCloudinary.js";

export default function RequestOfferPage() {
  const location = useLocation();
  const vendor = location.state.vendor;

  const [onboardingData, setOnboardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onNext = (stepData, isLastStep = false) => {
    //input validation
    if (_.isEmpty(stepData)) return toast.warning("Must select a value");
    if (isLastStep) {
      handleSubmit({ ...onboardingData, ...stepData });
    } else {
      setOnboardingData({ ...onboardingData, ...stepData });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const onFinish = async () => {
    await handleSubmit();
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let imgUrls = [];
      console.log(data.imgUrls);
      for (let file of data.imgUrls) {
        const data = await uploadImageToCloudinary(file);
        console.log(data);
        imgUrls.push(data.url);
      }

      // for (let i = 0; i < data.imgUrls.length; i++) {
      //   console.log(data.imgUrls[i]);
      // }

      const response = await axios.post(`${BACKEND_PATH}appointments`, {
        ...data,
        title: data.name,
        description: data.description,
        date: Date(data.date),

        vendorId: vendor._id,
        location: data.location,
        imgUrls: imgUrls,
      });

      if (response) {
        toast.success("Booked successfully");
        navigate("/profile");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="py-10 h-full mt-5 grid grid-cols-6 ">
      <div className=" bg-white border p-5 mt-5 lg:col-start-2 lg:col-span-4 sm:col-span-6  rounded-xl shadow-2xl">
        <div className="flex justify-center mb-4">
          <div
            className="relative"
            style={{
              marginTop: "-90px",
              backgroundColor: "#e7e7e7",
              borderRadius: "50%",
              border: "5px solid #fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: 1,
            }}
          >
            <img
              src={vendor.photo ? vendor.photo : defaultImg}
              alt="Plumber"
              className="rounded-full"
              style={{ maxHeight: "150px", maxWidth: "150px" }}
            />
          </div>
        </div>

        <ControlledOnboardingFlow
          currentIndex={currentIndex}
          onNext={onNext}
          onPrevious={onPrevious}
          onFinish={onFinish}
          loading={loading}
        >
          <ServiceInfoForm />
          <LocationInfo />
          <UploadImageForm />
        </ControlledOnboardingFlow>
      </div>{" "}
    </div>
  );
}
