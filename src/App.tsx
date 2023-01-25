import { useEffect, useState } from "react";
import { fetchUsers } from "@api/users";
import { isErrorWithMessage } from "@components/helpers";
import Loading from "@components/loading";
import styles from "@styles/App.module.css";
import Dropdown from "@components/dropdown";
import RepositoryCard from "@components/repository-card";
import Snackbar from "@components/snackbar";
import type { KeyboardEventHandler } from "react";
import type { UserDataType } from "@api/users";
import type { SnackbarPropsType } from "@components/snackbar";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserDataType[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [snackbar, setSnackbar] = useState<
    SnackbarPropsType & { show: boolean }
  >({
    variant: "success",
    message: "",
    show: false,
  });

  const getUsers = async () => {
    setShowData(false);
    setIsLoading(true);
    const result = await fetchUsers(username);
    if (isErrorWithMessage(result)) {
      setSnackbar({
        variant: "error",
        message: result.message,
        show: true,
      });
    } else {
      setUsers(result);
      setShowData(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (snackbar.show) {
      setTimeout(() => {
        setShowData(false);
        setSnackbar({
          variant: "success",
          message: "",
          show: false,
        });
      }, 2000);
    }
  }, [snackbar.show]);

  const handlePress: KeyboardEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    if (e.key === "Enter") {
      getUsers();
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Enter Username"
            aria-label="username-input"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handlePress}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <button disabled={username === ""} onClick={getUsers}>
              Search
            </button>
          )}
        </div>
        {showData && (
          <div className={styles.userSection}>
            {users.length > 0 ? (
              users.map(
                ({ login: githubUsername, repositories, id: userId }) => (
                  <Dropdown key={userId} label={githubUsername}>
                    {repositories.length > 0 &&
                      repositories.map(
                        ({
                          id,
                          name: title,
                          description,
                          stargazers_count: stargazersCount,
                        }) => (
                          <RepositoryCard
                            key={id}
                            title={title}
                            description={description}
                            stargazerCount={stargazersCount}
                          />
                        )
                      )}
                  </Dropdown>
                )
              )
            ) : (
              <div className={styles.notFound}>Ooop username not found </div>
            )}
          </div>
        )}
        {snackbar.show && (
          <Snackbar variant={snackbar.variant} message={snackbar.message} />
        )}
      </div>
  );
}

export default App;
