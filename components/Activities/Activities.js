import React from "react";
import {
  GoTrashcan,
  GoRepoForked,
  GoRepoPush,
  GoStar,
  GoBook,
  GoCommentDiscussion,
  GoIssueClosed,
  GoIssueOpened,
} from "react-icons/go";
import styles from "./Activities.module.scss";

const Activities = ({ activityData }) => {
  const extractActivity = () => {
    const message = activityData.map(activity => {
      let icon = "";
      let action = "";
      let actionPerformed; // For Pull req
      let repoName = activity.repo.name;
      let time = new Date(activity.created_at)
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ");

      switch (activity.type) {
        case "PushEvent":
          icon = <GoRepoPush />;
          let commit = "commit";
          let branch = activity.payload.ref.slice(11);

          if (activity.payload.size > 1) {
            commit = "commits";
          }
          action = `Pushed ${activity.payload.size} ${commit} to ${branch} in `;
          break;

        case "WatchEvent":
          icon = <GoStar />;
          action = "Starred the repository ";
          break;

        case "ReleaseEvent":
          icon = <GoBook />;
          actionPerformed =
            activity.payload.action.charAt(0).toUpperCase() +
            activity.payload.action.slice(1);

          action = `${actionPerformed} a release in `;
          break;
        case "DeleteEvent":
          icon = <GoTrashcan />;
          action = `Deleted a ${activity.payload.ref_type} ${activity.payload.ref} from `;
          break;

        case "ForkEvent":
          icon = <GoRepoForked />;
          action = `Forked a repository ${repoName} to `;
          repoName = activity.payload.forkee.full_name;
          break;

        case "IssueCommentEvent":
          icon = <GoCommentDiscussion />;
          actionPerformed =
            activity.payload.action.charAt(0).toUpperCase() +
            activity.payload.action.slice(1);

          action = `${actionPerformed} a comment on an issue in `;
          break;

        case "IssuesEvent":
          if (activity.payload.action === "closed") {
            icon = <GoIssueClosed />;
          } else {
            icon = <GoIssueOpened />;
          }
          actionPerformed =
            activity.payload.action.charAt(0).toUpperCase() +
            activity.payload.action.slice(1);

          action = `${actionPerformed} an issue in `;
          break;

        default:
          action = "";
      }
      return { icon, action, repoName, time };
    });

    return message;
  };

  const buildActivityList = () => {
    const messages = extractActivity();
    // console.log(messages);
    if (messages.length > 0) {
      return messages.map(message => (
        <li key={message?.id}>
          <a
            href={`https://github.com/${message.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.activity__item}
          >
            <div className={styles.activity__top}>
              <div className={styles.activity__name}>
                <h3>{message.action}</h3>
              </div>
              <div className={styles.activity__repoName}>
                {message?.repoName.length > 20
                  ? message?.repoName.slice(0, 20) + "..."
                  : message?.repoName}
              </div>
            </div>
            <div className={styles.activity__bottom}>
              <div className={styles.activity__icon}>{message.icon}</div>
              <div className={styles.activity__time}>
                <h3>{message.time}</h3>
              </div>
            </div>
          </a>
        </li>
      ));
    } else {
      return <p>No available repositories!</p>;
    }
  };

  return (
    <div className={styles.activity__container}>
      <header>
        <h2>Top Activities</h2>
      </header>
      <div className={styles.activity__list}>{buildActivityList()}</div>
    </div>
  );
};

export default Activities;
