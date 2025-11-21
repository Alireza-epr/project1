import { ESTACURLS } from "@/types/apiTypes";
import { useEffect, useState } from "react";

const postBody = {
  collections: ["sentinel-2-l2a"],
  filter: {
    op: "and",
    args: [
      {
        op: "<=",
        args: [
          {
            property: "eo:cloud_cover",
          },
          10,
        ],
      },
      {
        op: ">=",
        args: [
          {
            property: "datetime",
          },
          {
            timestamp: "2025-08-19T00:00:00Z",
          },
        ],
      },
      {
        op: "s_contains",
        args: [
          {
            property: "geometry",
          },
          {
            type: "Polygon",
            coordinates: [
              [
                [6.980803263345194, 51.10990285774977],
                [7.683914901863773, 51.10389656882401],
                [7.675943114578587, 50.8760849480924],
                [6.9728314760600085, 50.88815585282626],
                [6.980803263345194, 51.10990285774977],
              ],
            ],
          },
        ],
      },
    ],
  },
};

export const useFilterSTAC = (a_STACRequest?) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);

      const resp = await fetch(ESTACURLS.searchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      if (!resp.ok) {
        throw new Error("[useFilterSTAC] Response not ok");
      }

      const respJSON = await resp.json();
      setResponse(respJSON);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    response,
    error,
    isLoading,
    fetchData,
  };
};
