const Welcome = ({ onLogout, userEmail }) => {
  return (
    <div className="welcomeMsg-container">
      <div className="welcome_msg">
        <i>👋</i> <span>Welcome, {userEmail}!</span>
      </div>
      <button className="btn logout" onClick={() => onLogout()}>
        Logout
      </button>
    </div>
  );
};

export default Welcome;
