import React, { useRef, useState, useEffect } from "react";
import { FaGithubAlt } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { useRouter } from "next/router";
import { Head } from "../components";
import styles from "./Home.module.scss";

const Home = () => {
  const router = useRouter();
  const inputRef = useRef();
  const [username, setUserName] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    router.replace(`/user/${username}`);
  };

  return (
    <main>
      <Head title="Know your gitstats" />
      <div className={styles.container}>
        <form onSubmit={onSubmit}>
          <FaGithubAlt /> <MdQueryStats />
          <label htmlFor="username">Know your gitstats</label>
          <span>Enter Github Username</span>
          <input
            name="username"
            placeholder="ex: shubhamsj07"
            type="text"
            ref={inputRef}
            onChange={e => setUserName(e.target.value)}
            autoComplete="off"
          />
        </form>
      </div>
    </main>
  );
};

export default Home;
