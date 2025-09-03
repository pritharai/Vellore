export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = (e) => {
        console.log(e)
        reject(new Error("Failed to load Razorpay script"));
    }
    document.body.appendChild(script);
  });
};