import { useState } from "react";
import defaultImg from "#assets/images/default0.png";
import starIcon from "#assets/images/Star.png";
import AboutSection from "./AboutSection";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import { useBackendGet, useFetch } from "#lib/hooks";
import _ from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import FeedbackList from "../FeedbackSection/FeedbackList";
import { Breadcrumbs } from "@material-tailwind/react";
import { BsHouse, BsHouseFill } from "react-icons/bs";

export default function VendorDetails() {
  const location = useLocation();
  const [tab, setTab] = useState("feedback");

  const { id } = useParams();
  const [vendor, fetchData] = useBackendGet(`vendors/${id}`, {
    reviews: [],
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-[1170px] px-5 mx-auto">
        <Breadcrumbs className="mt-2">
          <a onClick={() => navigate("/")} className="opacity-60">
            <BsHouseFill />
          </a>
          <a onClick={() => navigate("/plumbers")} className="opacity-60">
            <span>Plumbers</span>
          </a>
          <a href="#"> {_.capitalize(vendor.name)}</a>
        </Breadcrumbs>
        <div className="mt-[40px]">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px] rounded-circle">
                  <img
                    src={
                      vendor.profileImageUrl
                        ? vendor.profileImageUrl
                        : defaultImg
                    }
                    alt=""
                    className="rounded-full"
                  />
                </figure>
                <div>
                  <span
                    className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px]
                lg:leading-7 font-semibold rounded"
                  >
                    {vendor.specialization}
                  </span>
                  <h3 className="text-HeadingColor text-[22px] leading-9 mt-3 font-bold">
                    {_.capitalize(vendor.name)}
                  </h3>

                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />
                      {vendor.averageRating}
                    </span>
                    <span className=" text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({vendor.totalRating})
                    </span>
                  </div>

                  <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] ">
                    {vendor.bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34] ">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] texst-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] texst-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              {vendor && (
                <div className="mt-[50px]">
                  {tab === "about" && (
                    <AboutSection vendor={vendor} key={vendor._id} />
                  )}
                  {tab === "feedback" && (
                    <FeedbackList vendor={vendor} fetchData={fetchData} />
                  )}
                </div>
              )}
            </div>
            <div>
              <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text__para mt-0 font-semibold">Service fee</p>
                  <span className="text-[16px] leadin-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold ">
                    20 EUR/h
                  </span>
                </div>

                <div className="mt-[30px]">
                  <p className="text__para mt-0 font-semibold text-headingColor">
                    Available:
                  </p>

                  <ul className="mt-3">
                    <li className="flex items-center justify-between mb-2">
                      <p className="text-[15px] leading-6 text-textColor font-semibold">
                        Monday to Saturday
                      </p>
                      <p className="text-[15px] leading-6 text-textColor font-semibold">
                        4:00 - 9:30 PM
                      </p>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn px-2 w-full rounded-md"
                  onClick={() => {
                    /* handle request offer logic */
                    navigate(`/booking/${vendor._id}`, {
                      state: {
                        vendor: vendor,
                        service: location.state?.service,
                      },
                    });
                  }}
                >
                  Request an Offer
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
