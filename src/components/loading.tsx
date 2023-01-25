import styles from "@styles/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading} role="progressbar">
      <div></div>
    </div>
  );
};

export default Loading;
