import HealthStatus from "../Component/MainPage/HealthStatus";
import Condition from '../Component/MainPage/Condition';
import { useMediaQuery } from "react-responsive";

const Mainpage = () => {
  return (
    <div>
      <HealthStatus />
      <Condition/>
    </div>
  );
};

export default Mainpage;
