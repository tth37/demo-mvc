import { observer } from "mobx-react-lite";
import { route } from "navi";
import { Link } from "react-navi";
import { authService } from "../../../controller/authService";

let HomePage: React.FC = () => {
  const handleLogout = () => {
    const logoutUserResponse = authService.logoutUser();
    if (logoutUserResponse.status === "success") {
      window.location.reload();
    }
  };

  return (
    <>
      <div>Home</div>
      <Link href="/login">Login</Link>
      <a onClick={handleLogout}>Logout</a>
    </>
  );
};

HomePage = observer(HomePage);

export default HomePage;
