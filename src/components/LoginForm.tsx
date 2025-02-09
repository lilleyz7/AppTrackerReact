import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckForTokens } from "../lib/authUtils";
import { useNavigate } from "react-router";
import { login } from "../lib/authController";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigationController = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
    const err = await login(email, password);
    if(err){
        alert("Invalid Credentials")
    } else{
      navigationController("/dashboard");
    }
  };

  useEffect(() => {
        const success = CheckForTokens();
        if (success){
            navigationController("/dashboard")
        }
  }, [navigationController])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
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
                minLength={10} 
                maxLength={40}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button className="w-full" type="submit">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

