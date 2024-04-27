import Appointment from "../models/AppointmentSchema.js";

export const getAllAppointments = async (req, res) => {
  try {
    let where = {};
    req.params.vendorId
      ? (where.vendor = req.params.vendorId)
      : (where.user = req.params.userId);

    const data = await Appointment.find(where)
      .populate(["vendor", "user"])
      .select("-password");

    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const createAppointment = async (req, res) => {
  const userId = req.user.id;

  if (req.body.clientId) userId = req.body.clientID;
  const { vendorId } = req.body;

  try {
    const data = await Appointment.create({
      ...req.body,
      vendor: vendorId,
      user: userId,
    });

    console.log(data);

    res.status(201).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const data = await Appointment.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    console.log(data);
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const data = await Appointment.findByIdAndDelete(req.params.id);
    console.log(data);
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
  }
};
