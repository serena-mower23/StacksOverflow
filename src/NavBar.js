import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    navigate("/");
  };
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <label className="navbar-brand m-2 h1">&#128184; $tacksOverflow &#128184;</label>
          <button className="nav-link btn btn-link" onClick={(e) => logoutHandler()}>
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
}
