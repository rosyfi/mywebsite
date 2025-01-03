import React, { useState } from "react";
import styles from "../styles/Toggle.module.css";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div
      className={`${styles.toggleSwitch} ${isOn ? styles.on : styles.off}`}
      onClick={handleToggle}
    >
      <div className={styles.toggleKnob} />
    </div>
  );
};

export default Toggle;
