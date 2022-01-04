import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./Toggle.module.scss";

const Toggle = ({ isDark, onToggle }) => {
  // console.log({ isDark });

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id="check"
        className={styles.checkbox}
        checked={isDark}
        onChange={onToggle}
      />
      <label htmlFor="check" className={styles.label}>
        <FaMoon className={styles.moon} />
        <FaSun className={styles.sun} />
        <div className={styles.slider}></div>
      </label>
    </div>
  );
};

export default Toggle;
