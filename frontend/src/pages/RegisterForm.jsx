import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    // Remove the confirmPassword field from formData
    const { confirmPassword, ...dataToSend } = formData;
  
    try {
      const response = await axios.post('http://localhost:8000/account', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Registration was successful
      // Currently printing success message as an error
      // Once we decide how we want to route users after registration I will change this
      setError(response.data.message);
      
    } catch (error) {
      console.error('Registration error:', error);
      setError('That email already exists.');
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
