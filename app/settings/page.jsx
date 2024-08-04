"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProcessLoader from "../../components/Loader/PageLoader";
import { ErrorToast, SuccessToast } from "@/utils/ShowToast";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice"; // Ensure this slice manages customer data
import CustomText from "../../components/Inputs/CustomText";
import CustomInput from "@/components/Inputs/CustomInput";
import { UpdateCustomerApi } from "@/Https";

const EditCustomerComponent = ({ customerId }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [ref, setRef] = useState("");
  const [page, setPage] = useState("");

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Fetch customers when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCustomers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Get customer and auth state from redux store
  const CustomerState = useSelector((state) => state.CustomerState);
  const AuthState = useSelector((state) => state.AuthState);

  // Set form data when customer data is available
  useEffect(() => {
    if (!CustomerState.loading && AuthState.data.length > 0) {
      const currentCustomer = CustomerState.data.find(
        (dt) => dt._id === AuthState.data[0].customerId
      );
      if (currentCustomer) {
        setName(currentCustomer.name);
        setContact(currentCustomer.contact);
        setEmail(currentCustomer.email);
        setPassword(""); // Keep password field empty for security
        setCnic(currentCustomer.cnic);
        setAddress(currentCustomer.address);
        setRef(currentCustomer.ref);
        setPage(currentCustomer.page);
      }
    }
  }, [CustomerState, AuthState]);

  const [Status, setStatus] = useState(true);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (
      !name ||
      !contact ||
      !email ||
      !cnic ||
      !address ||
      !ref ||
      page === ""
    ) {
      ErrorToast("Required fields are undefined");
      setLoading(false);
      return;
    }

    const updatedCustomerData = {
      name,
      contact,
      email,
      password,
      cnic,
      address,
      ref,
      page,
    };

    try {
      const response = await UpdateCustomerApi({
        customerId: AuthState.data[0].customerId,
        payload: updatedCustomerData,
      }); // Use the appropriate API function for updating a customer
      if (response.data.success) {
        SuccessToast(response.data.message);
        dispatch(fetchCustomers()); // Fetch updated customer data
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) {
    return <ProcessLoader />;
  }

  return (
    <div className="flex flex-col justify-center items-center py-5 pt-[120px]">
      <h2 className="text-2xl font-semibold mb-5 w-[90%] bg-black text-white text-center py-4 rounded-full">
        Edit Account
      </h2>
      <form className="flex flex-wrap gap-x-4 gap-y-4 justify-center items-start">
        <div className="flex flex-col gap-y-4">
          {Status ? (
            <CustomText label="Name" Value={name} setValue={setName} required />
          ) : (
            <CustomInput
              label="Name"
              Value={name}
              setValue={setName}
              required
            />
          )}
          {Status ? (
            <CustomText
              id="contact"
              type="text"
              label="Contact"
              placeholder="Enter Contact"
              Value={contact}
              setValue={setContact}
              required
            />
          ) : (
            <CustomInput
              id="contact"
              type="text"
              label="Contact"
              placeholder="Enter Contact"
              Value={contact}
              setValue={setContact}
              required
            />
          )}
          {Status ? (
            <CustomText
              id="email"
              type="email"
              label="Email"
              placeholder="Enter Email"
              Value={email}
              setValue={setEmail}
              required
            />
          ) : (
            <CustomInput
              id="email"
              type="email"
              label="Email"
              placeholder="Enter Email"
              Value={email}
              setValue={setEmail}
              required
            />
          )}
          {Status ? (
            <CustomText
              id="cnic"
              type="text"
              label="CNIC"
              placeholder="Enter CNIC"
              Value={cnic}
              setValue={setCnic}
              required
            />
          ) : (
            <CustomInput
              id="cnic"
              type="text"
              label="CNIC"
              placeholder="Enter CNIC"
              Value={cnic}
              setValue={setCnic}
              required
            />
          )}
        </div>
        <div className="flex flex-col gap-y-4">
          {Status ? (
            <CustomText
              id="address"
              type="text"
              label="Address"
              placeholder="Enter Address"
              Value={address}
              setValue={setAddress}
              required
            />
          ) : (
            <CustomInput
              id="address"
              type="text"
              label="Address"
              placeholder="Enter Address"
              Value={address}
              setValue={setAddress}
              required
            />
          )}
          {Status ? (
            <CustomText
              id="ref"
              type="text"
              label="Ref"
              placeholder="Enter Ref"
              Value={ref}
              setValue={setRef}
              required
            />
          ) : (
            <CustomInput
              id="ref"
              type="text"
              label="Ref"
              placeholder="Enter Ref"
              Value={ref}
              setValue={setRef}
              required
            />
          )}
          {Status ? (
            <CustomText
              id="page"
              type="number"
              label="Page"
              placeholder="Enter Page"
              Value={page}
              setValue={setPage}
              required
            />
          ) : (
            <CustomInput
              id="page"
              type="number"
              label="Page"
              placeholder="Enter Page"
              Value={page}
              setValue={setPage}
              required
            />
          )}
        </div>
        <div className="w-full flex justify-center mt-5">
          {loading ? (
            <ProcessLoader />
          ) : (
            <div
              onClick={(e) => {
                if (Status) {
                  setStatus(false);
                } else {
                  handleSubmit(e);
                  setStatus(true);
                }
              }}
              // type="submit"
              className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500 text-center"
            >
              {Status ? "Enable Editing" : "Update Customer"}
            </div>
          )}
        </div>
        <div className="w-full flex justify-center mt-5">
          {loading ? (
            <ProcessLoader />
          ) : (
            <div
              onClick={(e) => {
                localStorage.clear();
                // Refresh the window
                window.location.reload();
              }}
              // type="submit"
              className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500 text-center cursor-pointer"
            >
              Logout
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditCustomerComponent;
