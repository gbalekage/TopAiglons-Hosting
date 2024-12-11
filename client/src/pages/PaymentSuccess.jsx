import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LoaderSpin from "../components/LoaderSpin";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePaymentSuccess = async () => {
    // Extract session_id and domain from query parameters
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");
    const domain = queryParams.get("domain");

    if (!sessionId || !domain) {
      console.error("Invalid or missing parameters: session_id or domain.");
      return;
    }

    try {
      // Send session_id and domain to the backend
      const response = await axios.post(
        "http://localhost:5000/api/domain/success",
        { session_id: sessionId, domain },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Payment success response:", response.data);
    } catch (error) {
      console.error("Error in handlePaymentSuccess:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();
  }, []);

  const handleRedirect = () => {
    navigate("/dashboard"); // Redirect to dashboard or any other page
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      {loading ? (
        <LoaderSpin />
      ) : (
        <div>
          <p className="text-lg font-semibold">{message}</p>
          <button
            onClick={handleRedirect}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
