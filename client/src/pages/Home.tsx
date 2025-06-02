import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to PrepBot</h1>
      <p>Practice your interviews with real-time AI feedback</p>
      <button onClick={() => navigate('/interview')}>Start Interview</button>
    </div>
  );
};

export default Home;
