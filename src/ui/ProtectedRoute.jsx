import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //Load the authenticated user
  const { isLoadingUserData, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUserData) navigate("/login");
    },
    [isAuthenticated, isLoadingUserData, navigate]
  );

  if (isLoadingUserData)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
