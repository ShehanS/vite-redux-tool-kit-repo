import { FC, ReactNode, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import {useNavigate} from "react-router-dom";

type Props = {
  children: NonNullable<ReactNode>;
};
const IdealTimerContainer: FC<Props> = ({ children }) => {
  const timeout = 60*1000*5;//5 miniutes
  const navigate = useNavigate();
  const [isIdle, setIsIdle] = useState(false);
  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);
  useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });
  if(isIdle == true){
    navigate('/login', {replace: true});
  }
  return (<>{ children }</>);

}
export default IdealTimerContainer;
