import React, { useState } from 'react';
import axios from 'axios';

const AddShow = () => {
  const [formData, setFormData] = useState({
    showName: '',
    genre: '',
    releaseYear: '',
    network: '',
    isActive: false
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/shows', formData);
      setMessage('Show added successfully!');
      setFormData({
        showName: '',
        genre: '',
        releaseYear: '',
        network: '',
        isActive: false
      });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Show</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="showName"
          placeholder="Show Name"
          value={formData.showName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="network"
          placeholder="Network ID"
          value={formData.network}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>
        <button type="submit">Add Show</button>
      </form>
      {message && (
        <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>
      )}
    </div>
  );
};

export default AddShow; 