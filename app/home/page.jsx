"use client";
import LineColumnChart from "@/components/Charts/LineColumnChart";
import PageLoader from "@/components/Loader/PageLoader";
import Navbar from "@/components/Navbar/Navbar";
import AccountsStatInfo from "@/components/Tables/AccountsStatInfo";
import CompanyStatInfo from "@/components/Tables/CompanyStatInfo";
import { fetchAccounts } from "@/utils/Slices/AccountsStatSlice";
import { fetchBranchStats } from "@/utils/Slices/CompanyInfoStatSlice";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice";
import { fetchTopTen } from "@/utils/Slices/TopTenStatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const CompanyStatState = useSelector((state) => state.CompanyStatState);
  const TopTenState = useSelector((state) => state.TopTenState);
  const AccountsState = useSelector((state) => state.AccountsState);
  const AuthState = useSelector((state) => state.AuthState);

  const CustomerState = useSelector((state) => state.CustomerState);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  useEffect(() => {
    dispatch(fetchBranchStats());
    dispatch(fetchTopTen());
    dispatch(fetchAccounts());
  }, []);
  return (
    <div className="flex flex-col">
      {CompanyStatState.loading ||
      TopTenState.loading ||
      AccountsState.loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <PageLoader />
        </div>
      ) : (
        <div className=" mt-[14vh] flex flex-col justify-center items-center">
          <div className="font-bold text-2xl w-[90%] bg-black text-white text-center py-4 rounded-tr-lg rounded-tl-lg">
            Branch Statistics
          </div>
          <div className="w-[90%]">
            {CompanyStatState.data && (
              <CompanyStatInfo CompanyInfo={CompanyStatState.data || [{}]} />
            )}
          </div>
          <div className="font-bold text-2xl w-[90%] bg-black text-white text-center py-4 rounded-tr-lg rounded-tl-lg mt-5">
            Cash Summary
          </div>
          <div className="w-[90%]">
            {CustomerState.data && (
              <AccountsStatInfo
                AccountsInfo={CustomerState.data.find(
                  (dt) => dt._id === "66afcbf5b48d57400252a81c"
                )}
              />
            )}
          </div>
          <div className="font-bold text-2xl w-[100%] bg-black text-white text-center py-4 rounded-lg mt-10">
            Top Ten Companies
          </div>
          {TopTenState.data && console.log(TopTenState.data.customers)}
          {TopTenState.data.company && (
            <LineColumnChart Data={TopTenState.data.company} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
