import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <img src="https://images.softwaresuggest.com/software_logo/primelink-20240917014551.png" alt="" />
        <div className="nav">
          <Link to="/register"><button className="link">Register</button></Link>
          <Link to="/login"><button className="link">Login</button></Link>
        </div>
      </div>
      <h1>Welcome to the URL Shortener</h1>
      <div className="topics">
        <p>This app allows you to:</p>
        <ul>
          <li>Register/Login</li>
          <li>Shorten long URLs</li>
          <li>View your previously shortened URLs</li>
        </ul>
      </div>

    </div>
  );
}

