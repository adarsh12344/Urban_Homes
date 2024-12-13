// Simulated OTP verification service
// In a real application, this would be handled by a backend service
export const sendOTP = async (email: string, otp: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, always return success
  // In production, this would make an API call to your backend
  console.log(`OTP ${otp} would be sent to ${email}`);
  return true;
};

// Store OTP in memory (in production, this would be handled by the backend)
const otpStore = new Map<string, { otp: string; timestamp: number }>();

export const storeOTP = (email: string, otp: string) => {
  otpStore.set(email, {
    otp,
    timestamp: Date.now(),
  });
};

export const verifyOTP = (email: string, otp: string) => {
  const storedData = otpStore.get(email);
  if (!storedData) return false;

  // Check if OTP is expired (10 minutes)
  if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
    otpStore.delete(email);
    return false;
  }

  const isValid = storedData.otp === otp;
  if (isValid) {
    otpStore.delete(email);
  }
  return isValid;
};