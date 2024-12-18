import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordAPI } from "../../services/userService";
import AlertMessage from "../Alert/AlertMessage";
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 5 characters long")
    .required("Password is required"),
});
const UpdatePassword = () => {
  const { mutateAsync, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: updatePasswordAPI,
    mutationKey: ["update-password"],
  });
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);

      mutateAsync(values)
        .then((data) => {
          // ? clear the password field after update
          formik.setFieldValue("newPassword", "");
        })
        .catch((error) => console.log(error));
    },
  });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      {isSuccess && (
        <AlertMessage type={"success"} message={"Password Updated"} />
      )}
      {isError && (
        <AlertMessage type={"error"} message={error.response.data.message} />
      )}
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("newPassword")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.newPassword}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
