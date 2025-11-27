import { useMapStore } from "@/store/mapStore";
import {
  ESTACURLS,
  ISTACFilterRequest,
  ISTACFilterResponse,
  IStacSearchResponse,
} from "../types/apiTypes";

export const useFilterSTAC = () => {
  const setResponseFeatures = useMapStore((state) => state.setResponseFeatures);
  const setErrorFeatures = useMapStore((state) => state.setErrorFeatures);

  const getFeatures = async (a_STACRequest: ISTACFilterRequest) => {
    const filterRequest = {
      ...a_STACRequest,
      limit: 20,
    };

    //console.log(new Date(Date.now()).toISOString()+" Get STAC Items")
    try {
      const resp = await fetch(ESTACURLS.searchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterRequest),
      });

      if (!resp.ok) {
        throw new Error("[useFilterSTAC] Response not ok");
      }

      const respJSON = await resp.json();
      setResponseFeatures(respJSON);
    } catch (err: any) {
      setErrorFeatures(err);
    }
  };

  return {
    getFeatures,
  };
};
