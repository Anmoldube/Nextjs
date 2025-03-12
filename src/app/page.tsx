"use client";  // <-- Add this at the very top

import axios from "axios";
import { useEffect, useState } from "react";

// Define the expected structure of the user data
interface UserDetails {
  email: string;
  name: string;
}

// Async function to fetch user details
async function getUserDetails(): Promise<UserDetails> {
  const response = await axios.get<UserDetails>(
    "http://localhost:3000/api/user"
  );
  return response.data;
}

export default function Home() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hi there!</h1>

      {error && <p className="text-red-500">{error}</p>}

      {userDetails ? (
        <>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
