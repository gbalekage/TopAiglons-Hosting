import React, { useEffect } from "react";

const PaymentCancel = () => {
  useEffect(() => {
    document.title = `Payment Canceled`;
  }, []);
  return <div>PaymentCancel</div>;
};

export default PaymentCancel;
