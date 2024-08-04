"use client";
import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Popover,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import ProcessLoader from "../Loader/ProcessLoader";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { UpdateItemQtyApi } from "@/Https";
import { ErrorToast, SuccessToast } from "@/utils/ShowToast";
import CustomInput from "../Inputs/CustomInput";
import CustomPopOver from "../Inputs/CustomPopOver";

const AddStockModal = ({ OpenModal, setOpenModal }) => {
  const [ItemId, setItemId] = useState("");
  const [NewStock, setNewStock] = useState("");
  const [Purchase, setPurchase] = useState("");
  const [InvoiceNo, setInvoiceNo] = useState("");
  const [TruckNo, setTruckNo] = useState("");
  const [Date, setDate] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!ItemId || !NewStock || !Purchase || !InvoiceNo || !TruckNo || !Date) {
      ErrorToast("All fields are required");
      setLoading(false);
    } else {
      try {
        const response = await UpdateItemQtyApi({
          itemId: ItemId,
          qty: Number(NewStock),
          purchase: Number(Purchase),
          invoice_no: InvoiceNo,
          truck_no: TruckNo,
          date: Date,
        });
        if (response.data.success) {
          SuccessToast(response.data.data.msg);
          dispatch(fetchItems());
          setOpenModal(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const ItemState = useSelector((state) => state.ItemState);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ModalWrapper open={OpenModal} setOpen={setOpenModal} title={"Add Stock"}>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 py-4">
        <div className="flex flex-col gap-y-4">
          <CustomPopOver
            label={"Select Item"}
            placeholder={"Select Item"}
            required={false}
            Value={
              ItemState.data.find((dt) => dt._id === ItemId)?.name ||
              "Select Item"
            }
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: "25px", // Add rounded corners
                backgroundColor: "white", // Set background color to white
                width: "300px", // Set the width as needed
                overflow: "hidden", // Hide overflowing content
                //   marginTop: "6px",
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography
              sx={{
                p: 2,
                borderColor: "#465462",
                backgroundColor: "#465462",
                width: "400px",
                overflow: "hidden",
                borderRadius: "25px",
              }}
            >
              <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                  {ItemState.data.map((dt) => (
                    <div
                      key={dt._id}
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => {
                        handleClose();
                        setItemId(dt._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={ItemId === dt._id}
                        readOnly
                      />
                      <span>{dt.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Typography>
          </Popover>

          <CustomInput
            id="new-stock"
            Type="number"
            label="Quantity"
            placeholder="Enter Quantity"
            Value={NewStock}
            setValue={setNewStock}
            required
          />

          <CustomInput
            id="purchase"
            Type="number"
            label="Purchase"
            placeholder="Enter Purchase"
            Value={Purchase}
            setValue={setPurchase}
            required
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <CustomInput
            id="invoice-no"
            Type="text"
            label="Invoice No"
            placeholder="Enter Invoice No"
            Value={InvoiceNo}
            setValue={setInvoiceNo}
            required
          />

          <CustomInput
            id="truck-no"
            Type="text"
            label="Truck No"
            placeholder="Enter Truck No"
            Value={TruckNo}
            setValue={setTruckNo}
            required
          />

          <CustomInput
            id="date"
            Type="date"
            label="Date"
            placeholder="Select Date"
            Value={Date}
            setValue={setDate}
            required
          />
        </div>
      </div>
      <div className="w-[100%] flex justify-center my-5 mt-1">
        {Loading ? (
          <ProcessLoader />
        ) : (
          <button
            onClick={handleSubmit}
            className="w-[50%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
          >
            Add Stock
          </button>
        )}
      </div>
    </ModalWrapper>
  );
};

export default AddStockModal;
