import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const agentsRes = await axios.get('http://localhost:5000/api/agents', config);
        setAgents(agentsRes.data);
        const listsRes = await axios.get('http://localhost:5000/api/upload', config);
        setLists(listsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/add-agent" style={{
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #28a745, #20c997)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'transform 0.2s'
        }}>➕ Add Agent</Link>
        <Link to="/upload" style={{
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #007bff, #6610f2)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'transform 0.2s'
        }}>📤 Upload CSV</Link>
      </div>

      <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center', fontSize: '1.5em' }}>👥 Agents ({agents.length})</h3>
      {agents.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', fontSize: '1.1em' }}>No agents added yet. Add some agents to get started!</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '15px',
          marginBottom: '40px'
        }}>
          {agents.map(agent => (
            <div key={agent._id} style={{
              background: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e0e0e0',
              transition: 'boxShadow 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }}>
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                  fontSize: '20px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {agent.name.charAt(0).toUpperCase()}
                </div>
                <h4 style={{ margin: '5px 0', color: '#333', fontSize: '1.2em' }}>{agent.name}</h4>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                <p style={{ margin: '8px 0' }}><strong>📧</strong> {agent.email}</p>
                <p style={{ margin: '8px 0' }}><strong>📱</strong> {agent.mobile}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>📋 Distributed Lists</h3>
      {lists.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No lists distributed yet. Upload a CSV file to distribute tasks!</p>
      ) : (
        lists.map(item => (
          <div key={item.agent} style={{
            background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '2px solid #f39c12'
          }}>
            <h4 style={{ color: '#d68910', marginBottom: '15px', textAlign: 'center' }}>
              📦 {item.agent} ({item.lists.length} items)
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '10px'
            }}>
              {item.lists.map(list => (
                <div key={list._id} style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '12px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f39c12'
                }}>
                  <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#333' }}>
                    👤 {list.firstName}
                  </p>
                  <p style={{ margin: '3px 0', color: '#666', fontSize: '14px' }}>
                    📞 {list.phone}
                  </p>
                  <p style={{ margin: '3px 0', color: '#666', fontSize: '14px' }}>
                    📝 {list.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;