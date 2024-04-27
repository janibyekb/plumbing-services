import Review from "../models/ReviewSchema.js";
import Plumber from "../models/VendorSchema.js";

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
  if (!req.body.vendor) req.body.vendor = req.params.vendorId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = new Review(req.body);
  console.log(newReview);
  try {
    const savedReview = await newReview.save();

    const data = await Plumber.findByIdAndUpdate(req.body.vendor, {
      $push: { reviews: savedReview._id },
    });
    if (data) {
      res.status(200).json({
        message: "Review submitted",
        data: savedReview,
      });
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
