import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import styles from "./styles/Toggle.module.css";

const Toggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOn, setIsOn] = useState(theme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = isOn ? "light" : "dark";
    setTheme(newTheme);
    setIsOn(!isOn);
  };

  return (
    <div
      className={`${styles.toggleSwitch} ${isOn ? styles.on : styles.off}`}
      onClick={toggleTheme}
    >
      <div
        className={`${styles.toggleKnob} ${isOn ? styles.on : styles.off}`}
      />
    </div>
  );
};

export default Toggle;
