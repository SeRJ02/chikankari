import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ADMIN_EMAIL } from '../../utils/constants';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup, isAuthenticated, user } = useAuth();

  // Auto-close if user becomes authenticated
  React.useEffect(() => {
    if (isAuthenticated && user) {
      console.log('✅ Login: User authenticated, closing modal');
      setSuccess(`Welcome back, ${user.name}!`);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  }, [isAuthenticated, user, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    console.log('🔐 Login: Attempting login with:', formData.email);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login: Login successful');
        setSuccess('Login successful! Redirecting...');
      } else {
        console.error('❌ Login: Login failed:', result.error);
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('❌ Login: Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: ADMIN_EMAIL,
      password: 'admin123'
    });
  };

  const handleCreateAdmin = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    console.log('👤 Login: Creating admin user...');

    try {
      const result = await signup(ADMIN_EMAIL, 'admin123', 'Admin User');
      
      if (result.success) {
        console.log('✅ Login: Admin user created successfully');
        setSuccess('Admin user created successfully! You can now log in.');
        setFormData({
          email: ADMIN_EMAIL,
          password: 'admin123'
        });
      } else {
        console.error('❌ Login: Failed to create admin user:', result.error);
        if (result.error?.includes('already registered')) {
          setError('Admin user already exists. Try logging in with the credentials.');
          setFormData({
            email: ADMIN_EMAIL,
            password: 'admin123'
          });
        } else {
          setError(result.error || 'Failed to create admin user.');
        }
      }
    } catch (err) {
      console.error('❌ Login: Unexpected error creating admin:', err);
      setError('An unexpected error occurred while creating admin user.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-baby-pink rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-dark-gray mb-2">
            Admin Login
          </h2>
          <p className="text-gray-600">
            Access your admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent transition-colors duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent transition-colors duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start space-x-2">
              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="loader"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateAdmin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={20} />
              <span>Create Admin User</span>
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-2">Expected admin credentials:</p>
            <p className="text-xs text-gray-600 mb-1">Email: {ADMIN_EMAIL}</p>
            <p className="text-xs text-gray-600 mb-2">Password: admin123</p>
            <button
              onClick={handleDemoLogin}
              className="text-xs text-baby-pink hover:text-baby-pink/80 underline"
            >
              Fill login form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;