import Timer from "otp-timer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OtpemailVerifyThunk } from "../../store/thunk/UserThunk";
import ErrorMessage from "../Common/ErrorMessage";

export default function OtpForm({ sendEmailOtp, setshowOtpForm }) {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const Verifyotp = async () => {
    const action = await dispatch(OtpemailVerifyThunk(otp)).unwrap();

    if (!error && action) {
      setshowOtpForm(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col items-center gap-4 p-6 bg-white shadow-md rounded-2xl w-fit"
    >
      <h2 className="text-xl font-semibold text-gray-700">Enter OTP</h2>

      <div className="flex gap-2">
        <input
          type="text" // change to text (safer for OTPs)
          inputMode="numeric" // brings numeric keyboard on mobile
          maxLength="6"
          value={otp}
          required
          onChange={(e) => setOtp(e.target.value)}
          className="w-[100px] h-10 border border-gray-300 rounded-lg text-center text-black text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <Timer seconds={60} minutes={4} />
      </div>
      {error && <ErrorMessage message={error} />}
      <div>
        <button
          onClick={Verifyotp}
          type="submit"
          className="px-4 m-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
        <button
          onClick={sendEmailOtp}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          resend otp
        </button>
      </div>
    </form>
  );
}
