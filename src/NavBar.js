import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    navigate("/");
  };
  return (
    <div className="container d-flex flex-column mt-2 align-items-center">
      <nav className="navbar navbar-expand-lg">
        <label className="m-2 h1">
          &#128184; $tacksOverflow &#128184;
        </label>
          <button
            className="nav-link btn btn-link"
            onClick={(e) => logoutHandler()}
          >
            Log out
          </button>
      </nav>
    </div>
  );
}
