import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Toggle from "./Toggle";
import styles from "./Header.module.scss";
import Link from "next/link";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

const Header = () => {
  const { isDarkTheme, onToggle } = useContext(ThemeContext);

  return (
    <div className={styles.header}>
      <Link href="/">
        <Logo width={270} />
      </Link>
      <SearchForm displaySpan={false} />
      <Toggle isDark={isDarkTheme} onToggle={onToggle} />
    </div>
  );
};

export default Header;
