"use client";
import PageLoader from "@/components/Loader/PageLoader";
import EditEmployeeModal from "@/components/Modals/EditEmployeeModal";
import Search from "@/components/Search/Search";
import EmployeeInfoTable from "@/components/Tables/EmployeeInfoTable";
import TableWrapper from "@/components/Tables/TableWrapper";
import { fetchEmployees } from "@/utils/Slices/EmployeeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmployeeeInfo() {
  const EmployeeState = useSelector((state) => state.EmployeeState);
  const [CustomerID, setCustomerID] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);
  return (
    <div className="flex justify-center items-center">
      {EmployeeState.loading ? (
        <PageLoader />
      ) : (
        <TableWrapper>
          <Search
            Placeholder="Search Employee..."
            Value={SearchText}
            setValue={setSearchText}
          />
          <EmployeeInfoTable
            setID={setCustomerID}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            SearchText={SearchText}
            Rows={EmployeeState.data}
          />

          {OpenEditModal && (
            <EditEmployeeModal
              OpenModal={OpenEditModal}
              setOpenModal={setOpenEditModal}
              CurrentEmployee={EmployeeState.data.find(
                (dt) => dt._id === CustomerID
              )}
            />
          )}

          {/* {OpenDeleteModal && (
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
          )} */}
        </TableWrapper>
      )}
    </div>
  );
}
