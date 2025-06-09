import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem',
        height: '100vh',
        background: 'white',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Left Side Content */}
      <div style={{ flex: 1, paddingRight: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '1rem' }}>
          Welcome to <span style={{ color: '#0077b6' }}>PrepBot</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
          Practice your interviews with real-time AI feedback and become the best version of your professional self.
        </p>
        <button
          onClick={() => navigate('/interview')}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#0077b6',
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#023e8a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0077b6')}
        >
          Start Interview
        </button>
      </div>

      {/* Right Side Image */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img
          src="../src/img/3661727.jpg"
          alt="Interview illustration"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '1rem' }}
        />
      </div>
    </div>
  );
};

export default Home;
