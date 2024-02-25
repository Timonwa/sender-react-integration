import React, { useState } from "react";

const SubscriptionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      const url = "https://api.sender.net/v2/subscribers";
      const apiKey = "YOUR_API_KEY"; // Replace with your API key

      const data = {
        email: email,
        firstname: firstname,
        groups: ["group_id"], // Replace with your group ID(s)
      };

      const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        alert("You have successfully subscribed to my newsletter.");
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubscribe();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Subscribe to my newsletter</h1>
      <label htmlFor="first_name">First name:</label>
      <input
        type="first_name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="Your first name"
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default SubscriptionForm;
