import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Building2 } from 'lucide-react';
import { sendOTP, storeOTP, verifyOTP } from '../services/auth';
import toast, { Toaster } from 'react-hot-toast';

interface AuthProps {
  onLogin: () => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !showOtp) {
      const newOtp = generateOTP();
      
      const emailSent = await sendOTP(email, newOtp);
      
      if (emailSent) {
        storeOTP(email, newOtp);
        setShowOtp(true);
        toast.success('OTP sent! (For demo, check console)');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
      return;
    }

    if (!isLogin && showOtp) {
      if (verifyOTP(email, otp)) {
        toast.success('OTP verified successfully!');
        onLogin();
      } else {
        toast.error('Invalid or expired OTP. Please try again.');
      }
      return;
    }

    // Handle login (demo mode)
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && !showOtp && (
              <Input
                label="Full Name"
                type="text"
                required
              />
            )}
            
            {!showOtp && (
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}

            {isLogin && (
              <Input
                label="Password"
                type="password"
                required
              />
            )}

            {showOtp && (
              <div>
                <Input
                  label="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    OTP sent to {email}
                  </p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            <Button className="w-full" type="submit">
              {isLogin ? 'Sign in' : (showOtp ? 'Verify OTP' : 'Send OTP')}
            </Button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setShowOtp(false);
                setOtp('');
              }}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}