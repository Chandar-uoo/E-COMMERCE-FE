import Timer from "otp-timer";

export const OtpForm = ({ formData, otp, setOtp, handleVerifyOtp,handleSendOtp}) => {
  
  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">
            Enter the OTP sent to {formData.email}
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              placeholder="Enter OTP"
            />
          </div>
          <Timer text={"OTP expires in"} seconds={59} minutes={4} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
            >
              Resend OTP
            </button>
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length < 6}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
