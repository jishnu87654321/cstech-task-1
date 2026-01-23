import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      const res = await axios.post('http://localhost:5000/api/upload', formData, config);
      setMessage(res.data.message);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;