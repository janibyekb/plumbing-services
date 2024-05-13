import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_PATH } from "./utils";

/*Customizing the fetch to use states*/
export function useFetch(url, initValue, config = {}, callback) {
  const [state, setState] = useState(initValue);

  async function fetch() {
    try {
      const response = await axios.get(url, config);
      setState(response.data);
      if (callback) {
        callback(response.data);
      }
    } catch (error) {
      console.error(error);

      if (callback) {
        callback(initValue);
      }
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return [state, fetch];
}

export function useBackendGet(url, initValue) {
  return useFetch(BACKEND_PATH + url, initValue);
}
