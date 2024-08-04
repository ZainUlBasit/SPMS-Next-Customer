"use client";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch } from "react-redux";
import ProcessLoader from "../Loader/ProcessLoader";
import { CreateCustomerApi } from "@/Https"; // Make sure to define this API function
import { ErrorToast, SuccessToast } from "@/utils/ShowToast";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice"; // Define this slice to manage customer data
import CustomInput from "../Inputs/CustomInput";

const CreateCustomerModal = ({ OpenModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    cnic: "",
    address: "",
    ref: "",
    page: "",
  });

  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { name, contact, email, password, cnic, address, ref, page } =
      formData;

    if (
      !name ||
      !contact ||
      !email ||
      !password ||
      !cnic ||
      !address ||
      !ref ||
      page === ""
    ) {
      ErrorToast("Required fields are undefined");
      setLoading(false);
      return;
    }

    try {
      const response = await CreateCustomerApi(formData);
      if (response.data.success) {
        SuccessToast(response.data.message);
        dispatch(fetchCustomers()); // Ensure you have a function to fetch customer data
        setOpenModal(false);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper
      open={OpenModal}
      setOpen={setOpenModal}
      title={"Add Customer"}
    >
      <div className="flex flex-col justify-center py-5">
        <div className="flex flex-wrap gap-x-4 gap-y-4">
          <div className="flex flex-col gap-y-4">
            <CustomInput
              id="name"
              Type="text"
              label="Name"
              placeholder="Enter Name"
              Value={formData.name}
              setValue={(value) => handleChange("name", value)}
              required
            />
            <CustomInput
              id="contact"
              Type="text"
              label="Contact"
              placeholder="Enter Contact"
              Value={formData.contact}
              setValue={(value) => handleChange("contact", value)}
              required
            />
            <CustomInput
              id="email"
              Type="email"
              label="Email"
              placeholder="Enter Email"
              Value={formData.email}
              setValue={(value) => handleChange("email", value)}
              required
            />
            <CustomInput
              id="password"
              Type="password"
              label="Password"
              placeholder="Enter Password"
              Value={formData.password}
              setValue={(value) => handleChange("password", value)}
              required
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <CustomInput
              id="cnic"
              Type="text"
              label="CNIC"
              placeholder="Enter CNIC"
              Value={formData.cnic}
              setValue={(value) => handleChange("cnic", value)}
              required
            />
            <CustomInput
              id="address"
              Type="text"
              label="Address"
              placeholder="Enter Address"
              Value={formData.address}
              setValue={(value) => handleChange("address", value)}
              required
            />
            <CustomInput
              id="ref"
              Type="text"
              label="Ref"
              placeholder="Enter Ref"
              Value={formData.ref}
              setValue={(value) => handleChange("ref", value)}
              required
            />
            <CustomInput
              id="page"
              Type="number"
              label="Page"
              placeholder="Enter Page"
              Value={formData.page}
              setValue={(value) => handleChange("page", value)}
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          {Loading ? (
            <ProcessLoader />
          ) : (
            <button
              onClick={handleSubmit}
              className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
            >
              Add Customer
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateCustomerModal;
