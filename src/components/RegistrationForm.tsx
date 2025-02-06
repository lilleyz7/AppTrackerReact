import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckForTokens } from "../lib/authUtils";
import { useNavigate } from "react-router";
import { register } from "../lib/authController";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<Error>();

  
  const navigationController = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation){
        setError(Error("Passwords do not match"))
    }
    console.log("Registering in with", { email, password });
    const err = await register(email, password);
    if(err){
        setError(err)
    }
    navigationController("/login");
  };

  useEffect(() => {
        const success = CheckForTokens();
        if (success){
            navigationController("/dashboard")
        }
  }, [navigationController])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        {error && (<p>{error.message}</p>)}
      <Card className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$"
                minLength={10} 
                maxLength={40} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$"
                title="Minimum of 7 characters. Should have at least one special character and one number and one UpperCase Letter."
                minLength={7}
                maxLength={40}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Confirm Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={passwordConfirmation} 
                minLength={7}
                maxLength={20}
                onChange={(e) => setPasswordConfirmation(e.target.value)} 
                required 
              />
            </div>
            <Button className="w-full" type="submit">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

