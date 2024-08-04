import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/utils/Slices/AuthSlice";
import CompanyReducer from "@/utils/Slices/CompanySlice";
import ItemSlice from "@/utils/Slices/ItemSlice";
import CustomerSlice from "@/utils/Slices/CustomerSlice";
import EmployeeSlice from "@/utils/Slices/EmployeeSlice";
import CompanyItemLegderSlice from "@/utils/Slices/CompanyItemLegderSlice";
import PaymentSlice from "@/utils/Slices/PaymentSlice";
import CompanyInfoStatSlice from "@/utils/Slices/CompanyInfoStatSlice";
import TopTenStatSlice from "@/utils/Slices/TopTenStatSlice";
import AccountsStatSlice from "@/utils/Slices/AccountsStatSlice";
import CustomerItemLegderSlice from "@/utils/Slices/CustomerItemLegderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      AuthState: AuthReducer,
      CompanyState: CompanyReducer,
      ItemState: ItemSlice,
      CustomerState: CustomerSlice,
      EmployeeState: EmployeeSlice,
      CompanyItemLegderState: CompanyItemLegderSlice,
      PaymentState: PaymentSlice,
      CompanyStatState: CompanyInfoStatSlice,
      TopTenState: TopTenStatSlice,
      AccountsState: AccountsStatSlice,
      CustomerItemLegderState: CustomerItemLegderSlice,
    },
  });
};
