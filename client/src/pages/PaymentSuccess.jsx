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
      setMessage("Invalid or missing payment details.");
      setLoading(false);
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

      // Set success message and redirect to dashboard
      setMessage("Payment and domain registration were successful!");
      setLoading(false);

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/dashboard", { state: { successMessage: message } });
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error(
        "Error in handlePaymentSuccess:",
        error.response?.data || error.message
      );
      setMessage("An error occurred while processing your payment.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      {loading ? (
        <LoaderSpin />
      ) : (
        <div>
          <p className="text-lg font-semibold">{message}</p>
          {!loading && (
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
