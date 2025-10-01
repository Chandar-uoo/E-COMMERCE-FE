import { toast } from 'react-toastify';
export const rzpay = (razorPay) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: razorPay.key_id,
      amount: razorPay.amount,
      currency: razorPay.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: razorPay.orderId,

      // ✅ Called when payment is successful
      handler: function (response) {
        toast.success("payment has been done successfully")
        resolve({
          status: "success",
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
      },

      prefill: {
        name: razorPay.prefill.name,
        contact: razorPay.prefill.phoneNo,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);

    // ✅ Handle failure
    rzp.on("payment.failed", function (response) {
      reject({
        status: "failed",
        code: response.error.code,
        description: response.error.description,
        reason: response.error.reason,
        metadata: response.error.metadata,
      });
    });

    rzp.open();
  });
};
