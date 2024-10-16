import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [menuPosition, setMenuPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, open, close, menuPosition, setMenuPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id, children }) {
  const { open, close, openId } = useContext(MenuContext);
  const { setMenuPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const toggleButton = e.target.closest("button");
    const togglePos = toggleButton.getBoundingClientRect();
    const curMenuPosition = {
      x: window.innerWidth - togglePos.width - togglePos.x,
      y: togglePos.y + togglePos.height + 8,
    };
    setMenuPosition(curMenuPosition);

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>{children}</StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, menuPosition, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  if (id !== openId) return;
  return (
    <StyledList ref={ref} position={menuPosition}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
