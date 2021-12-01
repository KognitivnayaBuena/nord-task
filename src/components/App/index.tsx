import { Private } from "../Private";
import { ServerList } from "../ServerList";

import "./index.css";

export const App = () => {
  return (
    <div className={"app"}>
      <Private>
        <ServerList />
      </Private>
    </div>
  );
};
