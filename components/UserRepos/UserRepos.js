import React, { useState, useEffect, useCallback } from "react";
import FlipMove from "react-flip-move";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { GoRepo } from "react-icons/go";
import { BiGitRepoForked } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { languageDataColors } from "../../utils";
import styles from "./UserRepos.module.scss";

const UserRepos = ({ repoData }) => {
  const [topRepos, setTopRepos] = useState([]);
  const [sortType, setSortType] = useState("stars");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTopRepos = useCallback(
    type => {
      const LIMIT = 30;
      const map = {
        stars: "stargazers_count",
        forks: "forks_count",
        size: "size",
      };
      const sortProperty = map[type];
      const sorted = repoData
        .filter(repo => !repo.fork)
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, LIMIT);

      setTopRepos(sorted);
    },
    [repoData]
  );

  useEffect(() => {
    if (repoData.length) {
      getTopRepos();
    }
  }, [getTopRepos, repoData.length]);

  useEffect(() => getTopRepos(sortType), [getTopRepos, sortType]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const changeRepoSort = sortType => {
    setSortType(sortType);
    toggleDropdown();
  };

  const sortTypes = ["stars", "forks", "size"];

  return (
    <div
      className={styles.section}
      style={{ backgroundColor: "#27292D", color: "#fff" }}
    >
      <div className={styles.repo__container}>
        <header>
          <h2>Top Repos</h2>
          <div className={styles.dropdown__wrapper}>
            <span className={styles.label}>by</span>
            <div className={styles.dropdown}>
              <button
                className={styles.dropdown__button}
                onClick={() => toggleDropdown()}
              >
                <label>{sortType}</label>

                {dropdownOpen ? <AiOutlineDown /> : <AiOutlineUp />}
              </button>
              {dropdownOpen && (
                <ul className={styles.dropdown__list}>
                  {sortTypes.map((type, i) => (
                    <li className={styles.dropdown__list__item} key={i}>
                      <button onClick={() => changeRepoSort(type)}>
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        <div className={styles.repo__list}>
          {topRepos.length > 0 ? (
            <FlipMove typeName="ul">
              {topRepos.map(repo => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repo}
                  >
                    <div className={styles.repo__top}>
                      <div className={styles.repo__name}>
                        <GoRepo />
                        <h3>{repo.name}</h3>
                      </div>
                      <p>{repo.description}</p>
                    </div>
                    <div className={styles.repo__stats}>
                      <div className={styles.repo__stats__left}>
                        <span>
                          <div
                            className={styles.language}
                            style={{
                              backgroundColor:
                                languageDataColors[repo.language],
                            }}
                          />
                          {/* {repo.language === null && "CSS"} */}
                          {repo.language}
                        </span>
                        <span>
                          <BsStarFill />
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span>
                          <BiGitRepoForked />
                          {repo.forks.toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.repo__stats__right}>
                        <span>{repo.size.toLocaleString()} KB</span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </FlipMove>
          ) : (
            <p>No available repositories!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserRepos;
