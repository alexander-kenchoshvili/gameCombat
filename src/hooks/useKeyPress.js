import { useEffect, useState } from "react";

export const useKeyPress = () => {
  const [keysPressed, setKeysPressed] = useState()

  const keyDown = ({ key }) => {
    setKeysPressed(`Key${key.toUpperCase()}`)
  }

  const onKeyUp = ({ key }) => {
    setKeysPressed("for multiple press");
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return {
    keysPressed
  };
};