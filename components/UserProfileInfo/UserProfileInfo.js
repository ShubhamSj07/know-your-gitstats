import React from "react";
import Image from "next/image";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscCalendar } from "react-icons/vsc";
import styles from "./UserProfileInfo.module.scss";

const UserProfileInfo = ({ userData }) => {
  return (
    <div className={styles.section}>
      <div className={styles.userInfo}>
        {userData?.avatar_url && (
          <div className={styles.avatar}>
            <Image
              loader={() => userData?.avatar_url}
              width={150}
              height={150}
              src={userData?.avatar_url}
              alt="avatar"
            />
          </div>
        )}
        <h1>{userData?.name}</h1>
        <h2>
          <a
            href={userData?.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{userData?.login}
          </a>
        </h2>
        <div className={styles.info}>
          <span className={styles.info__item}>
            {userData?.company && <BsBriefcase />}
            {userData?.company}
          </span>
          <span className={styles.info__item}>
            {userData?.company && <MdOutlineLocationOn />}
            <MdOutlineLocationOn />
            {userData?.location}
          </span>
          <span className={styles.info__item}>
            <VscCalendar />
            Joined{" "}
            {new Date(userData?.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stats__item}>
            <span className={styles.num}>
              {userData?.public_repos.toLocaleString()}
            </span>
            <span className={styles.num_label}>Repositories</span>
          </div>
          <div className={styles.stats__item}>
            <span className={styles.num}>
              {userData?.followers.toLocaleString()}
            </span>
            <span className={styles.num_label}>Followers</span>
          </div>
          <div className={styles.stats__item}>
            <span className={styles.num}>
              {userData?.following.toLocaleString()}
            </span>
            <span className={styles.num_label}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
