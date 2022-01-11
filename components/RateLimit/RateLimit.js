import styles from "./RateLimit.module.scss";

const RateLimit = ({ rateLimit }) => {
  return (
    <>
      {rateLimit && (
        <div className={styles.limit}>
          <div className={styles.num}>
            {`${rateLimit.remaining} / ${rateLimit.limit}`}
          </div>
          <p>Requests Left</p>
        </div>
      )}
    </>
  );
}

export default RateLimit;
