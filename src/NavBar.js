import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    navigate("/");
  };
  return (
    <>
      <button onClick={(e) => logoutHandler()}>Logout</button>
    </>
  );
}
