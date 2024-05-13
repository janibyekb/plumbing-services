import Vendor from "../models/VendorSchema.js";

//Get all vendors; Query search is optional, could be used on the cient side
export const getAllVendors = async (req, res, next) => {
  try {
    const { query } = req.query;
    let vendors;
    if (query) {
      vendors = await Vendor.find({
        // isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      //   vendors = await Vendor.find({ isApproved: "approved" }).select(
      //     "-password"
      //   );
      vendors = await Vendor.find({}).select("-password");
    }
    res.status(200).json(vendors);
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found!" });
  }
};

//Getting a vendor by id
export const getSingleVendor = async (req, res, next) => {
  //   if (req.user.id !== req.params.id)
  //     return next(errorHandler(401, "You can only delete your own account!"));
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate("reviews")
      .select("-password");

    // const { password, ...rest } = user._doc;

    res.status(200).json(vendor);
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "No user found!" });
  }
};

export const updateVendor = async (req, res, next) => {
  //   if (req.user.id !== req.params.id)
  //     return next(errorHandler(401, "You can only update your own account!"));
  console.log(req.body);
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...rest } = updatedVendor._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Vendor has been deleted!");
  } catch (error) {
    next(error);
  }
};
