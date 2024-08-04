import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    // app_secret:
    //   "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728",
    // userToken,
  },
});

export const apiForImage = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    // app_secret:
    //   "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728",
    // userToken,
  },
});

// AUth requests
export const LoginApi = (payload) => api.post("/login", payload);

//  Company Requests
export const CreateCompanyApi = (payload) => api.post("/company", payload);
export const UpdateCompanyApi = (payload) => api.patch("/company", payload);
export const DeleteCompanyApi = (payload) =>
  api.post("/company/delete", payload);
export const GetCompanyApi = () => api.get("/company");
export const GetCompanyItemLedgerApi = (payload) =>
  api.post("/company/item-ledger", payload);

// ======================================
//  items requests
// ======================================
export const CreateItemApi = (payload) => api.post("/item", payload);
export const DeleteItemApi = (payload) => api.post("/item/delete", payload);
export const UpdateItemApi = (payload) => api.patch("/item", payload);
export const UpdateItemQtyApi = (payload) => api.post("/item/qty", payload);
export const GetItemApi = () => api.get("/item");

// Customer REQUESTS
export const CreateCustomerApi = (payload) => api.post("/customer", payload);
export const GetCustomerApi = () => api.get("/customer");
export const UpdateCustomerApi = (payload) => api.patch("/customer", payload);
export const DeleteCustomerApi = (payload) =>
  api.post("/customer/delete", payload);

// Employee Requests
export const CreateEmployeeApi = (payload) => api.post("/employee", payload);
export const UpdateEmployeeApi = (payload) => api.patch("/employee", payload);
export const DeleteEmployeeApi = (payload) =>
  api.post("/employee/delete", payload);
export const GetEmployeeApi = () => api.get("/employee");

// Payment Requests
export const CreatePaymentApi = (payload) => api.post("/payment", payload);
export const GetPaymentsByIdApi = (payload) =>
  api.post("/payment/get_by_id", payload);

// Transactions Request
export const CheckInvoiceNoApi = (payload) =>
  api.post("/transaction/check-invoice-no", payload);
export const CreateTransactionApi = (payload) =>
  api.post("/transaction", payload);
export const GetTransactionByIdApi = (payload) =>
  api.post("/transaction/get-by-id", payload);

// RETURN REQUEST
export const CreateReturnApi = (payload) => api.post("/return", payload);
export const GetReturnByIdApi = (payload) =>
  api.post("/return/get-by-id", payload);

// Statistics
export const GetCompanyInfoStatsApi = () => api.get("/stats/company_info");
export const GetTopTenStatsApi = () => api.get("/stats/top-ten");
export const GetAccountsStatsApi = () => api.get("/stats/accounts-info");
