import { useEffect, useState } from "react";
import Login from "./components/LoginForm";
import Welcome from "./components/Welcome";

function App() {
  // Load user email if previously logged In
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("userEmail");
  });

  // Function that handles login success
  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("userEmail", email); // save user email
  };

  // function that handles logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("userEmail"); // clear storage
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
