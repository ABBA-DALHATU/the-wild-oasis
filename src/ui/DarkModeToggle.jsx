import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContextProvider";

function DarkModeToggle() {
  const { isDarkMode, ToggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={ToggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
