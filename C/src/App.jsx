import { useEffect, useState } from "react";
import Login from "./components/LoginForm";
import Welcome from "./components/Welcome";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function that handles login success
  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // function that handles logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  // useEffect to handle 'focus' class
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunction() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function blurFunction() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunction);
      input.addEventListener("blur", blurFunction);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunction);
        input.removeEventListener("blur", blurFunction);
      });
    };
  });

  return (
    <div className="main">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Welcome onLogout={handleLogout} userEmail={userEmail} />
      )}
    </div>
  );
}

export default App;
