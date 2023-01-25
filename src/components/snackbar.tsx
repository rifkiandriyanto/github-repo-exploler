import styles from "@styles/snackbar.module.css";

export type SnackbarPropsType = {
  variant: "success" | "error";
  message: string;
};
const Snackbar = ({ variant, message }: SnackbarPropsType) => {
  return (
    <div
      className={styles.snackbar}
      style={{ backgroundColor: variant === "error" ? "red" : "green" }}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
