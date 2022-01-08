import React, { useState } from "react";
import { FaGithubAlt } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { useRouter } from "next/router";
import { Head } from "../components";
import styles from "./Home.module.scss";

const Home = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");

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
          <input
            name="username"
            placeholder="ex: shubhamsj07"
            type="text"
            onChange={e => setUserName(e.target.value)}
          />
        </form>
      </div>
    </main>
  );
}

export default Home;
