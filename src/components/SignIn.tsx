// SignIn.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:3000"

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the POST request to the backend
    try {
        let res = await fetch(URL + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                credentials: "include"
            })

        console.log("Status: ", res.status)
        setUsername("")
        setPassword("")
        
        if (res.status == 200) {
            console.log("Navigating...");
            navigate("/dashboard")
        } else {
                alert("Wrong credentials");
            }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-gray-100">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="mt-20 w-80 space-y-4 rounded-md bg-white p-6 shadow-md"
      >
        <h1 className="text-xl font-semibold">Sign In</h1>

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
};
