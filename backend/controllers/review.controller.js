import Review from "../models/ReviewSchema.js";
import Plumber from "../models/PlumberSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({
      message: "Successfull",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({ message: "Not found!" });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.plumber) req.body.plumber = req.params.plumberId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = new Review(req.body);
  console.log(newReview);
  try {
    const savedReview = await newReview.save();

    const data = await Plumber.findByIdAndUpdate(req.body.plumber, {
      $push: { reviews: savedReview._id },
    });
    console.log(data);
    res.status(200).json({
      message: "Review submitted",
      data: savedReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
