import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

// PayPal Button Component
const PayPalButton = ({ totalAmount, onPaymentSuccess }) => {
  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount, // Pass the total amount for the payment
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          return actions.order.capture().then(async (details) => {
            // Payment success, send details to backend
            onPaymentSuccess(details);
            toast.success('Payment successful!');
          });
        },
        onError: (err) => {
          toast.error('Payment failed! Please try again.');
          console.error('PayPal Checkout Error:', err);
        },
      }).render('#paypal-button-container'); // Render the PayPal button inside the container
    } else {
      console.log("PayPal script not loaded");
    }
  }, [totalAmount, onPaymentSuccess]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
