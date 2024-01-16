import { useState } from "react";
import { formateDate } from "#lib/utils";
import { AiFillStar } from "react-icons/ai";
import defaultImg from "../../assets/images/default0.png";
import FeedbackForm from "./FeedbackForm";

export default function Feedback({ plumber, fetchData }) {
  const { reviews } = plumber;
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({reviews.length})
        </h4>

        {reviews.map((review) => (
          <div className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img
                  className="w-full"
                  src={plumber.photo ? plumber.photo : defaultImg}
                  alt=""
                />
              </figure>

              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review.user.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formateDate("02-14-2023")}
                </p>
                <p className="text-[15px] text__para mt-3 font-medium">
                  {review.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067ff" />
              ))}
            </div>
          </div>
        ))}

        {!showFeedbackForm ? (
          <div className="text-center">
            {" "}
            <button className="btn" onClick={setShowFeedbackForm}>
              Give feedback
            </button>
          </div>
        ) : (
          <FeedbackForm
            plumberId={plumber._id}
            fetchData={fetchData}
            onClose={() => {
              setShowFeedbackForm(false);
              fetchData();
            }}
          />
        )}
      </div>
    </div>
  );
}
