import { observer } from "mobx-react-lite";
import RegisterComponent from "../../components/register/RegisterComponent";
import LayoutCenter from "../../layout/center/LayoutCenter";

let RegisterPage: React.FC = () => {
  return (
    <LayoutCenter maxWidth="450px">
      <RegisterComponent />
    </LayoutCenter>
  );
};

RegisterPage = observer(RegisterPage);

export default RegisterPage;
