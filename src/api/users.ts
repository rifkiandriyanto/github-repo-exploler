import {
  type RepositoryDataType,
  fetchRepositories,
} from "./repositories";
import { ErrorWithMessageType, getErrorMessage } from "@components/helpers"

export type UserDataType = {
  id: number;
  repositories: Array<RepositoryDataType>;
  login: string;
};

export type UserDataResponseType = {
  incomplete_results: boolean;
  items: Array<UserDataType>;
  total_count: number;
};

export const fetchUsers = async (
  username: string
): Promise<Array<UserDataType> | ErrorWithMessageType> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );
    if (response.ok) {
      const { items, total_count: totalCount }: UserDataResponseType =
        await response.json();
      const total = totalCount < 5 ? totalCount : 5;
      const users: Array<UserDataType> = [];
      for (let i = 0; i < total; i++) {
        const repositories = await fetchRepositories(items[i].login);
        if (repositories) {
          users.push({ ...items[i], repositories });
        }
      }
      return users;
    } else {
      throw new Error("Something went wrong..");
    }
  } catch (error) {
    return {
      isInstanceOfError: true,
      message: getErrorMessage(error),
    };
  }
};
