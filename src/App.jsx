import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/register/register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank">
                    <img
                      src={reactLogo}
                      className="logo react"
                      alt="React logo"
                    />
                  </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                  <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>
                </div>
                <p className="read-the-docs">
                  Click on the Vite and React logos to learn more
                </p>
              </>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
