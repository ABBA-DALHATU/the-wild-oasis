import { useEffect, useRef } from "react";

function useOutsideClick(func, capturePhase = true) {
  const ref = useRef();
  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) func();
    }

    document.addEventListener("click", handleClick, capturePhase);

    return () =>
      document.removeEventListener("click", handleClick, capturePhase);
  });

  return ref;
}

export default useOutsideClick;
