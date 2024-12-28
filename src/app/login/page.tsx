'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import MainCard from '../dashboard/mainCard';
import { toast } from 'react-hot-toast';
import { login } from './actions';
import { useMyContext } from '@/context/myContext';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // const {
  //   stringData,
  //   setStringData,
  //   numberData,
  //   setNumberData,
  //   booleanData,
  //   setBooleanData,
  // } = useMyContext();

  // const handleStringChange = () => {
  //   setStringData("New String Data");
  // };

  // const handleNumberChange = () => {
  //   setNumberData(42); // Example number
  // };

  // const handleBooleanToggle = () => {
  //   setBooleanData(!booleanData); // Toggle the boolean value
  // };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await login(data);

    if (!result.success) {
      toast.error(`Login failed: ${result.message}`);
    } else {
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard'; // Redirect after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* <h1>String Data: {stringData}</h1>
      <Button onClick={handleStringChange}>Update String Data</Button>

      <h1>Number Data: {numberData}</h1>
      <Button onClick={handleNumberChange}>Update Number Data</Button>

      <h1>Boolean Data: {booleanData ? "True" : "False"}</h1>
      <Button onClick={handleBooleanToggle}>Toggle Boolean Data</Button> */}
      <div className="w-full max-w-sm">
        <MainCard
          title="Login"
          description="Enter your email and password to log in."
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="password"
                className="flex items-center justify-between mb-1"
              >
                Password
                <a
                  // href="/forgot-password"
                  className="text-blue-500 hover:underline ml-2"
                >
                  Forgot Password?
                </a>
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            <Button type="button" variant="outline" className="mt-4 w-full">
              Google
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </MainCard>
      </div>
    </div>
  );
};

export default LoginForm;
