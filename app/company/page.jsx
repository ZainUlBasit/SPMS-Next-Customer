"use client";
import { DeleteCompanyApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditCompany from "@/components/Modals/EditCompany";
import Search from "@/components/Search/Search";
import CompanyInfoTable from "@/components/Tables/CompanyInfoTable";
import TableComp from "@/components/Tables/TableComponent";
import TableWrapper from "@/components/Tables/TableWrapper";
import { SuccessToast } from "@/utils/ShowToast";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CompanyInfo() {
  const [CompanyID, setCompanyID] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);

  const CompanyState = useSelector((state) => state.CompanyState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await DeleteCompanyApi({ companyId: CompanyID });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        setOpenDeleteModal(false);
        dispatch(fetchCompanies());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full">
      {CompanyState.loading || !CompanyState.data ? (
        <PageLoader />
      ) : (
        CompanyState.data && (
          <div className="w-[90%]">
            {/* <Search
              Placeholder="Search Company..."
              Value={SearchText}
              setValue={setSearchText}
            /> */}
            <TableComp
              title="COMPANIES INFO"
              rows={CompanyState.data}
              Value={SearchText}
              setValue={setSearchText}
              placeholder={"Search Company..."}
            />
            {/* <CompanyInfoTable
              setID={setCompanyID}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              SearchText={SearchText}
              Rows={CompanyState.data || []}
            /> */}
          </div>
        )
      )}

      {OpenEditModal && CompanyID && (
        <EditCompany
          key={`edit-${CompanyID}`} // Ensure unique key for each modal instance
          open={OpenEditModal}
          setOpen={setOpenEditModal}
          CurrentCompany={CompanyState.data.find((dt) => dt._id === CompanyID)}
        />
      )}
      {OpenDeleteModal && CompanyID && (
        <DeleteModal
          key={`delete-${CompanyID}`} // Ensure unique key for each modal instance
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={handleDelete}
          Loading={Loading}
        />
      )}
    </div>
  );
}
