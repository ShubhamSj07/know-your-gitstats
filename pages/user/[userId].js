import React, { useState, useEffect, useCallback } from "react";
import GhPolyglot from "gh-polyglot";
import {
  Head,
  UserProfileInfo,
  Charts,
  Repos,
  Footer,
  Error,
  RateLimit,
  Activities,
} from "../../components/index";
import { FaGithubAlt } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { API } from "../../api";
import errorStyles from "../../components/Fallback/Error.module.scss";

const User = props => {
  const username = props.userId;

  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [repoData, setRepoData] = useState(null);

  const [loading, setLoading] = useState(true);

  // error handling
  const [error, setError] = useState({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState(null);

  const getUserData = useCallback(() => {
    fetch(`${API}/${username}`)
      .then(res => {
        console.log(res);
        if (res.status === 404) {
          setLoading(false);
          return setError({ active: true, type: 404 });
        }
        if (res.status === 403) {
          setLoading(false);
          return setError({ active: true, type: 403 });
        }
        setLoading(false);
        return res.json();
      })
      .then(json => setUserData(json))
      .catch(error => {
        setError({ active: true, type: 400 });
        console.error(error);
      });
  }, [username]);

  // fetch languages data
  // essential for better color visuals & data
  const getLanguageData = useCallback(() => {
    setLoading(true);
    const user = new GhPolyglot(`${username}`);
    user.userStats((error, stats) => {
      // console.log(stats);
      if (error) {
        console.error(error);
        setError({ active: true, type: 400 });
        setLoading(false);
      }
      setLangData(stats);
      setLoading(false);
    });
  }, [username]);

  // fetch repo data
  const getRepoData = useCallback(() => {
    fetch(`${API}/${username}/repos?per_page=100`)
      .then(res => {
        if (res.status === 404) {
          setLoading(false);
          return setError({ active: true, type: 404 });
        }
        if (res.status === 403) {
          setLoading(false);
          return setError({ active: true, type: 403 });
        }
        setLoading(false);
        return res.json();
      })
      .then(resData => setRepoData(resData))
      .catch(error => {
        setError({ active: true, type: 200 });
        console.error("Error:", error);
      });
  }, [username]);

  const getActivities = useCallback(() => {
    fetch(`${API}/${username}/events?per_page=30`)
      .then(res => {
        if (res.status === 404) {
          setLoading(false);
          return setError({ active: true, type: 404 });
        }
        if (res.status === 403) {
          setLoading(false);
          return setError({ active: true, type: 403 });
        }
        return res.json();
      })
      .then(resData => {
        // console.log(resData)
        setLoading(false);
        setActivityData(resData);
      });
  }, [username]);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  useEffect(() => {
    fetch("https://api.github.com/rate_limit")
      .then(res => res.json())
      .then(resData => {
        setRateLimit(resData.resources.core);
        if (resData.resources.core.remaining < 1) {
          setError({ active: true, type: 403 });
        }
      });
    getUserData();
    getLanguageData();
    getRepoData();
  }, [getLanguageData, getRepoData, getUserData]);

  if (loading) {
    return (
      <div className={errorStyles.error__container}>
        <div className={errorStyles.logo}>
          <FaGithubAlt /> <MdQueryStats />
        </div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {rateLimit && <RateLimit rateLimit={rateLimit} />}
      {error && error.active ? (
        <Error error={error} />
      ) : (
        <>
          <Head
            title={`${
              username
                ? `Know your gitstats | ${username}`
                : "Know your gitstats"
            }`}
          />
          {userData && <UserProfileInfo userData={userData} />}
          {langData && repoData && (
            <Charts langData={langData} repoData={repoData} />
          )}
          {repoData && <Repos repoData={repoData} />}
          {activityData && <Activities activityData={activityData} />}
          <Footer />
        </>
      )}
    </main>
  );
};

export default User;

export const getServerSideProps = async context => {
  const { params } = context;
  // console.log(params);

  return {
    props: {
      userId: params.userId,
    },
  };
};
