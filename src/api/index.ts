import { Server } from "../redux/servers/types";
import { LogInPayload } from "../redux/user/types";

const BASE_URL = "https://playground.nordsec.com/v1";

const fetchUserToken = async ({ username, password }: LogInPayload) => {
  const response = await fetch(`${BASE_URL}/tokens`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.ok) {
    const data: { token: string } = await response.json();
    return data;
  } else {
    throw new Error("Wrong username or password");
  }
};

const fetchServersList = async ({ token }: { token: string }) => {
  const response = await fetch(`${BASE_URL}/servers`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const server: Server[] = await response.json();
    return server;
  } else {
    throw new Error("Something went wrong");
  }
};

export const api = {
  fetchUserToken,
  fetchServersList,
};
