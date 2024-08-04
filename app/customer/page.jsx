"use client";
import { DeleteCustomerApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditCustomerModal from "@/components/Modals/EditCustomer";
import Search from "@/components/Search/Search";
import CompanyInfoTable from "@/components/Tables/CompanyInfoTable";
import CustomerInfoTable from "@/components/Tables/CustomerInfoTable";
import TableWrapper from "@/components/Tables/TableWrapper";
import { SuccessToast } from "@/utils/ShowToast";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CustomerInfo() {
  const [CustomerID, setCustomerID] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);
  const CustomerState = useSelector((state) => state.CustomerState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <div className="flex justify-center items-center">
      {CustomerState.loading ? (
        <PageLoader />
      ) : (
        <TableWrapper>
          <Search
            Placeholder="Search Customer..."
            Value={SearchText}
            setValue={setSearchText}
          />
          <CustomerInfoTable
            setID={setCustomerID}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            SearchText={SearchText}
            Rows={CustomerState.data}
          />

          {OpenEditModal && (
            <EditCustomerModal
              OpenModal={OpenEditModal}
              setOpenModal={setOpenEditModal}
              customerData={CustomerState.data.find(
                (dt) => dt._id === CustomerID
              )}
            />
          )}

          {OpenDeleteModal && (
            <DeleteModal
              Open={OpenDeleteModal}
              setOpen={setOpenDeleteModal}
              onSubmit={async () => {
                setLoading(true);
                try {
                  const response = await DeleteCustomerApi({
                    customerId: CustomerID,
                  });
                  if (response.data.success) {
                    SuccessToast(response.data.data.msg);
                    setOpenDeleteModal(false);
                    dispatch(fetchCustomers());
                  }
                } catch (err) {
                  console.log(err);
                }
                setLoading(false);
              }}
              Loading={Loading}
            />
          )}
        </TableWrapper>
      )}
    </div>
  );
}
