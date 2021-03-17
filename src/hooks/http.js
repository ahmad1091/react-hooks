import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("Sends http requesr...");
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, data];
};
