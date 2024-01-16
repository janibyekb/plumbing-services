import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BACKEND_PATH } from "../../lib/utils";
import axios from "axios";

export default function FeedbackForm({ plumberId, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        `${BACKEND_PATH}plumbers/${plumberId}/reviews`,
        {
          rating: rating,
          reviewText: reviewText,
        }
      );
      if (data) {
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How would you rate the overall experience?
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-graw-400"
                }`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                setMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-[30px]">
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
            Share your feedback or suggestions*
          </h3>

          <textarea
            className="border border-solid border-[##66ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
            rows="5"
            placeholder="Write your message"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button className="btn" type="submit" onClick={handleSubmitReview}>
          Submit
        </button>
      </div>
    </form>
  );
}
