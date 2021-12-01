import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Private } from "..";
import { ServerList } from "../../ServerList";
import { fetchServers, loginUser, store } from "../../../testRedux";

const loginUserTest = () =>
  store.dispatch(loginUser({ username: "cat", password: "cat" }));

const fetchServersTest = () => store.dispatch(fetchServers());

async function mountPrivate() {
  const Providers = (props: { children?: React.ReactNode }) => {
    return <Provider store={store}>{props.children}</Provider>;
  };

  const dom = render(
    <Private loginUserTest={loginUserTest}>
      <ServerList fetchServersTest={fetchServersTest} />
    </Private>,
    { wrapper: Providers }
  );

  return { dom };
}

describe("Test private", () => {
  it("Login form with correct username and password changes to servers list", async () => {
    const { dom } = await mountPrivate();

    const usernameInput = dom.getByTestId(
      "LoginForm:input:username"
    ) as HTMLInputElement;
    const passwordInput = dom.getByTestId(
      "LoginForm:input:password"
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "cat" } });
    fireEvent.change(passwordInput, { target: { value: "cat" } });

    expect(usernameInput.value).toBe("cat");
    expect(passwordInput.value).toBe("cat");

    const submitButton = dom.getByTestId("LoginForm:button:submit");
    submitButton.click();

    const serversListBlock = await dom.findByTestId("ServersList:block");
    const serversList = await dom.findByTestId("serversList:block:list");

    expect(serversListBlock).toBeDefined();
    expect(serversList).toBeDefined();
  });
});
