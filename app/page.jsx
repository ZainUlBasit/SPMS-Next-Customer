"use client";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LoginApi } from "@/Https";
import { SuccessToast } from "@/utils/ShowToast";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import { useDispatch } from "react-redux";
import { SetAuth } from "@/utils/Slices/AuthSlice";
import PageLoader from "@/components/Loader/PageLoader";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await LoginApi({ email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data?.data?.payload?.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.payload.user)
        );
        SuccessToast(response.data?.data?.msg);
        router.push("/home");
      } else {
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || err.message);
    }
    setLoading(false);
  };

  const dispatch = useDispatch();
  const [PageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setPageLoading(true);
    const currentToken = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentToken) {
      dispatch(SetAuth(currentUser));
      router.push("/home");
    }
    setPageLoading(false);
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      {PageLoading ? (
        <PageLoader />
      ) : (
        <div className="h-fit flex justify-center items-center flex-col p-5 px-5 rounded-xl">
          <Image src={Logo} className="w-[200px] h-[200px]" />
          <div className="font-bold text-3xl my-2">Sign In</div>

          <div className="flex flex-col items-center justify-center">
            <FormControl
              sx={{ m: 1, maxWidth: "40ch", minWidth: "300px" }}
              variant="outlined"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, maxWidth: "40ch", minWidth: "300px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <div className="w-full flex justify-center my-5">
              {Loading ? (
                <ProcessLoader />
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
