import Plumber from "../models/PlumberSchema.js";

export const getAllPlumbers = async (req, res, next) => {
  try {
    const { query } = req.query;
    let plumbers;
    if (query) {
      plumbers = await Plumber.find({
        // isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      //   plumbers = await Plumber.find({ isApproved: "approved" }).select(
      //     "-password"
      //   );
      plumbers = await Plumber.find({}).select("-password");
    }

    res.status(200).json(plumbers);
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found!" });
  }
};
export const getSinglePlumber = async (req, res, next) => {
  //   if (req.user.id !== req.params.id)
  //     return next(errorHandler(401, "You can only delete your own account!"));
  try {
    const plumber = await Plumber.findById(req.params.id)
      .populate("reviews")
      .select("-password");

    // const { password, ...rest } = user._doc;

    res.status(200).json(plumber);
  } catch (error) {
    console.log(err);
    res.status(404).json({ success: false, message: "No user found!" });
  }
};

export const updatePlumber = async (req, res, next) => {
  //   if (req.user.id !== req.params.id)
  //     return next(errorHandler(401, "You can only update your own account!"));
  console.log(req.body);
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedPlumber = await Plumber.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...rest } = updatedPlumber._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deletePlumber = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await Plumber.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Plumber has been deleted!");
  } catch (error) {
    next(error);
  }
};
