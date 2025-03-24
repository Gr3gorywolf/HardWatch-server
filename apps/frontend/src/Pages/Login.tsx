'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Server } from 'lucide-react';
import { getDevices } from '../Api/endpoints/devicesApi';

function Login() {
  const [appKey, setAppKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if appKey already exists
    const existingAppKey = localStorage.getItem('appKey');
    if (existingAppKey) {
      handleValidateKey(existingAppKey);
    }
  }, []);

  const handleValidateKey = async (appKey: string) => {
    setError('');
    if (!appKey.trim()) {
      setError('Please enter a valid App Key');
      return;
    }
    setIsLoading(true);
    // Simulate validation with loading state
    try {
      localStorage.setItem('appKey', appKey.trim());
      await getDevices();
      navigate('/');
    } catch (err) {
      setError('Invalid App Key');
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!appKey.trim()) {
      setError('Please enter a valid App Key');
      return;
    }

    // Simulate validation with loading state
    await handleValidateKey(appKey);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#2a2a2a] border-none shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img src="https://gr3gorywolf.github.io/multi-devices-monitor/assets/img/icon.png" alt="App icon" className="h-12 w-12 object-cover text-[#4caf50]" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            HardWatch
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your App Key to access the monitoring dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="appKey"
                className="text-sm font-medium text-gray-300"
              >
                App Key
              </label>
              <input
                id="appKey"
                type="text"
                value={appKey}
                onChange={(e) => setAppKey(e.target.value)}
                className="w-full px-3 py-2 bg-[#333333] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-white"
                placeholder="Enter your App Key"
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4caf50] hover:bg-[#3d8b40] text-white font-medium py-2 rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Validating...
                </div>
              ) : (
                'Access Dashboard'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
