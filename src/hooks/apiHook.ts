import { ESTACURLS, ISTACFilterRequest, ISTACFilterResponse } from "@/types/apiTypes";
import { useEffect, useState } from "react";

export const useFilterSTAC = () => {
  const [response, setResponse] = useState<ISTACFilterResponse | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (a_STACRequest: ISTACFilterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);

      const resp = await fetch(ESTACURLS.searchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(a_STACRequest),
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


  return {
    response,
    error,
    isLoading,
    fetchData,
  };
};
