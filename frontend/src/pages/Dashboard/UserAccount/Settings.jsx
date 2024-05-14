import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import _ from "lodash";

import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_PATH } from "#lib/utils.js";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../../redux/user/userSlice";
import { BsHouse, BsHouseFill, BsPerson } from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";

export default function Settings() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const initialData = {
    ...currentUser,
  };

  /*Submit request */
  async function handleUpdate(values) {
    try {
      const res = await axios.patch(
        `${BACKEND_PATH}users/${currentUser._id}`,
        values
      );
      console.log(res);
      dispatch(updateUserStart());
      if (res.status == 200) {
        dispatch(updateUserSuccess(res.data));
        toast.success("Updated Successfully");
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
      dispatch(updateUserFailure(err.message));
      toast.error("Operation failed");
      setEdit(false);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={initialData}
        validate={validate}
        onSubmit={handleUpdate}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
        }) => (
          <form>
            <div class="grid grid-cols-2 gap-2">
              <Input
                readOnly={!edit}
                name="name"
                value={values.name}
                onChange={handleChange}
                label="Name"
                icon={<BsPerson />}
              />

              <Input
                readOnly={!edit}
                name="phoneNumber"
                value={values.phoneNumber}
                placeholder=" "
                onChange={handleChange}
                label="Phone Number"
                icon={<BiPhoneCall />}
              />

              <div className="col-span-2 w-96">
                <Input
                  readOnly={!edit}
                  name="address"
                  value={values.address}
                  placeholder=" "
                  label="Home address"
                  onChange={handleChange}
                  icon={<BsHouseFill />}
                />{" "}
              </div>
            </div>

            <div className="text-end">
              {edit ? (
                <>
                  {_.isEqual(values, initialData) ? (
                    <Button
                      className="mt-6 w-36"
                      variant="gradient"
                      color="red"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <div>
                      <Button
                        className="mt-6 w-36 me-2"
                        variant="gradient"
                        onClick={() => {
                          setEdit(false);
                          resetForm();
                        }}
                      >
                        <span>Discard</span>
                      </Button>
                      <Button
                        className="mt-6 w-36"
                        color="green"
                        onClick={() => handleUpdate(values)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Button
                  className="mt-6 w-36"
                  color="blue"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </Button>
              )}{" "}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
