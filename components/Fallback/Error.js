import React from "react";
import { useRouter } from "next/router";
import { FaGithubAlt } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { Head } from "../index";
import styles from "./Error.module.scss";

const Error = ({ error }) => {
  const router = useRouter();

  const redirect = () => {
    router.replace("/");
  };

  return (
    <div className={styles.error__container}>
      <Head title="Know your gitstats" />
      <h1>Know your gitstats</h1>

      {error && (
        <div>
          <div className={styles.logo}>
            <FaGithubAlt /> <MdQueryStats />
          </div>
          {error.type === 403 ? (
            <>
              <p>
                Looks like you have exceeded{" "}
                <a
                  href="https://developer.github.com/v3/rate_limit/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rate limit{" "}
                </a>
              </p>
              <p>Please try again later!</p>
              <button onClick={redirect}>Go Home</button>
            </>
          ) : error.type === 404 ? (
            <>
              <p>User profile not found!</p>
              <button onClick={redirect}>Try again!</button>
            </>
          ) : (
            <>
              <p>Something went wrong...</p>
              <button onClick={redirect}>Go Home</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Error;
