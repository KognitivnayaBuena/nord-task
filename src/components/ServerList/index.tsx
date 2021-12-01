import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Error } from "../Error";
import { Button } from "../Button";

import { fetchServers } from "../../redux/servers/actions";

import {
  serversStatusSelector,
  serversSelector,
  serversErrorMessageSelector,
} from "../../redux/servers/selectors";

import { Server } from "../../redux/servers/types";
import { Statuses } from "../../redux/types";

import { useSort } from "../../hooks/useSort";
import { sortByName } from "./helpers/sortByName";
import { sortByDistance } from "./helpers/sortByDistance";

import "./index.css";

type ServerListProps = {
  fetchServersTest?: () => void;
};

export const ServerList = ({ fetchServersTest }: ServerListProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Boolean(fetchServersTest)) {
      fetchServersTest?.();
    } else {
      dispatch(fetchServers());
    }
  }, []);

  const status = useSelector(serversStatusSelector);
  const servers = useSelector(serversSelector);
  const errorMessage = useSelector(serversErrorMessageSelector);

  const isError = status === Statuses.Error;

  const [list, setList] = useState<Server[]>(servers);
  const nameSort = useSort();
  const distanceSort = useSort();

  useEffect(() => {
    setList(servers);
  }, [status]);

  const nameSortHandler = () => {
    const sortListAndSortValue = sortByName(list, nameSort.value);

    setList(sortListAndSortValue.sortList);
    nameSort.setSort(sortListAndSortValue.sort);
  };

  const distanceSortHandler = () => {
    const sortListAndSortValue = sortByDistance(list, distanceSort.value);

    setList(sortListAndSortValue.sortList);
    distanceSort.setSort(sortListAndSortValue.sort);
  };

  const rebutHandler = () => {
    setList(servers);
  };

  return (
    <div className={"serversList__wrapper"} data-testid={"ServersList:block"}>
      {isError && errorMessage && (
        <Error className={"serversList__error"}>{errorMessage}</Error>
      )}
      {status === Statuses.Loading && !isError && <p>Loading ...</p>}

      {status === Statuses.Success && list && (
        <>
          <Button className={"serversList_rebutButton"} onClick={rebutHandler}>
            Return Initilal List
          </Button>

          <div className={"serversList__title"}>
            <Button
              className={classNames(
                "serversList__button",
                `serversList__button_${nameSort.value}`
              )}
              onClick={nameSortHandler}>
              Name
            </Button>
            <Button
              className={classNames(
                "serversList__button",
                `serversList__button_${distanceSort.value}`
              )}
              onClick={distanceSortHandler}>
              Distance
            </Button>
          </div>

          <ul className={"serversList"} data-testid={"serversList:block:list"}>
            {list.map((server: Server, index) => (
              <li
                className={"serversList__item"}
                key={server.id}
                tabIndex={index}>
                <p>{server.name}</p>
                <p>{server.distance}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
