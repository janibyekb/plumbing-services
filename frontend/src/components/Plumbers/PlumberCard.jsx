import startIcon from "../../assets/images/Star.png";

import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import defaultImg from "../../assets/images/default0.png";
import _ from "lodash";

export default function PlumberCard({ plumber, key }) {
  const {
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    totalPatients,
    hospital,
  } = plumber;

  const navigate = useNavigate();

  return (
    <div className="p-3 lg:p-5 border rounded-xl">
      <div className="w-[200px] flex items-center mx-auto">
        <img src={photo ? photo : defaultImg} className="w-full" alt="" />{" "}
      </div>

      <div className="border-t border-t-gray-300 mt-4">
        <h2 className="texts-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-1">
          {_.capitalize(name)}
        </h2>
        <div className="mt-2 lg:mt-4 flex items-center justify-between">
          <span
            className="bg-[#CCF0F3] texst-irisBlueColor py-1 px-2 lg:py-2
         lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
          >
            {_.capitalize(specialization)}
          </span>

          <div className="flex items-center gap-[6px] ">
            <span
              className="flex items-center gap-[6px] 
         text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor"
            >
              <img src={startIcon} alt="" />
              {avgRating}
            </span>
            <span
              className="flex items-center gap-[6px] 
            text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor"
            >
              ({totalRating})
            </span>
          </div>
        </div>
        <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
          <div className="">
            <h3 className="text-16px leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
              +{totalPatients > 0 ? totalPatients : 0} clients
            </h3>
            <p className="text-[14px] leading-6 font-[400] text-textColor">
              At {hospital}
            </p>
          </div>
          <Link
            to={`${plumber._id}`}
            className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
                    flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
            <BsArrowRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
