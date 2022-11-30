import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    navigate("/");
  };
  return (
    <div className="container">
    <nav className="navbar navbar-expand-lg mb-4">
        <div className="container-fluid">
                    <button className="nav-link btn btn-link" onClick={(e) => logoutHandler()}>Log out of @</button>
        </div>
    </nav>
</div>
  );
}
