import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Joi from "joi";
import { SuccessToast, WarningToast } from "@/utils/ShowToast";
import { UpdateCompanyApi } from "@/Https";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { successMessage } from "@/utils/ResponseMessage";
import ProcessLoader from "../Loader/ProcessLoader";
import CustomInput from "../Inputs/CustomInput";

const EditCompany = ({ open, setOpen, CurrentCompany }) => {
  const [Name, setName] = useState(CurrentCompany.name);
  const [Contact, setContact] = useState(CurrentCompany.contact);
  const [Email, setEmail] = useState(CurrentCompany.email);
  const [Cnic, setCnic] = useState(CurrentCompany.cnic);
  const [Desc, setDesc] = useState(CurrentCompany.desc);
  const [Address, setAddress] = useState(CurrentCompany.address);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const schema = Joi.object({
      Name: Joi.string().required(),
      Contact: Joi.string().required(),
      Email: Joi.string().required(),
      Cnic: Joi.string().required(),
      Desc: Joi.string().required(),
      Address: Joi.string().required(),
    });

    // Validate input values
    const { error } = schema.validate({
      Name,
      Contact: Contact.toString(),
      Email,
      Cnic: Cnic.toString(),
      Desc,
      Address,
    });

    if (error) {
      alert(error.message);
      setLoading(false); // Set loading to false if validation fails
    } else {
      try {
        const response = await UpdateCompanyApi({
          name: Name,
          contact: Contact.toString(),
          email: Email,
          cnic: Cnic.toString(),
          desc: Desc,
          address: Address,
          companyId: CurrentCompany._id,
        });
        if (response.data.success) {
          successMessage(response.data.data.msg);
          dispatch(fetchCompanies());
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} title={"Edit Company"}>
      <div className="flex justify-center flex-col py-5 gap-y-4">
        <CustomInput
          id="name"
          label="Name"
          placeholder="Enter Name"
          Value={Name}
          setValue={setName}
        />
        <CustomInput
          id="contact"
          label="Contact"
          placeholder="Enter Contact"
          type="number"
          Value={Contact}
          setValue={setContact}
        />
        <CustomInput
          id="email"
          label="Email"
          placeholder="Enter Email"
          type="email"
          Value={Email}
          setValue={setEmail}
        />
        <CustomInput
          id="cnic"
          label="CNIC"
          placeholder="Enter CNIC"
          type="number"
          Value={Cnic}
          setValue={setCnic}
        />
        <CustomInput
          id="desc"
          label="Description"
          placeholder="Enter Description"
          type="text"
          Value={Desc}
          setValue={setDesc}
        />
        <CustomInput
          id="address"
          label="Address"
          placeholder="Enter Address"
          type="text"
          Value={Address}
          setValue={setAddress}
        />
        <div className="w-full flex justify-center mt-2">
          {Loading ? (
            <ProcessLoader />
          ) : (
            <button
              onClick={handleSubmit}
              className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
            >
              Update Company
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditCompany;
