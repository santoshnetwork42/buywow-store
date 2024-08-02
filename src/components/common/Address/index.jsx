"use client";

import { Button, Input } from "@/components/elements";
import { fetchCityAndState } from "@/lib/customAPIs";
import { useState, useEffect } from "react";

const Address = ({ userId }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [pincode, setPincode] = useState("");
  const [addressDetails, setAddressDetails] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      if (userId) {
        try {
          //   const response = await fetch(`/api/address/${userId}`);
          //   const data = await response.json();
          //   if (data.address) {
          //     setAddress(data.address);
          //   }
        } catch (error) {
          //   console.error("Error fetching address:", error);
        }
      }
    };

    fetchAddress();
  }, [userId]);

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetchCityAndState(pincode);
      console.log("result :>> ", result);

      setAddressDetails(result);
      setStep(2);
    } catch (error) {
      console.error("Error fetching pincode details:", error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const newAddress = {
      fullName,
      email,
      ...addressDetails,
      pincode,
    };
    try {
      const response = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });
      const data = await response.json();
      setAddress(data.address);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  if (address) {
    return (
      <div>
        <h2>Your Address</h2>
        <p>{address.fullName}</p>
        <p>{address.email}</p>
        <p>
          {address.street}, {address.area}
        </p>
        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>
      </div>
    );
  }

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handlePincodeSubmit}>
          <Input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode"
            required
            className="gap-1 border p-2"
            label="Enter Your Pincode"
          />

          <Button type="submit" variant="primary" className="p-2 px-4">
            Next
          </Button>
        </form>
      )}
      {console.log("step :>> ", step, addressDetails)}
      {step === 2 && addressDetails && (
        <form onSubmit={handleAddressSubmit}>
          <h2>Complete Your Address</h2>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <p>City: {addressDetails.city}</p>
          <p>State: {addressDetails.state}</p>
          <p>Area: {addressDetails.area}</p>
          <input
            type="text"
            value={addressDetails.street || ""}
            onChange={(e) =>
              setAddressDetails({ ...addressDetails, street: e.target.value })
            }
            placeholder="Street Address"
            required
          />
          <button type="submit">Save Address</button>
        </form>
      )}
    </div>
  );
};

export default Address;
