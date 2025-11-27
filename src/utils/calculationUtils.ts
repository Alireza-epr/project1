import { ESTACURLS, ITokenCollection } from "@/types/apiTypes";
import { fromUrl, TypedArray } from "geotiff";

export const getFeatureToken = async (
  a_Id: string,
): Promise<ITokenCollection | null> => {
  const resp = await fetch(`${ESTACURLS.collectionTokenURL}${a_Id}`);
  if (!resp.ok) {
    const respJSON = await resp.json();
    console.error("Failed to get the collection token: ");
    console.error(respJSON);
    return null;
  }
  const respJSON = await resp.json();
  return respJSON;
};

export const isTokenExpired = (a_Token: ITokenCollection): boolean => {
  const expiredDateUTCString = a_Token["msft:expiry"]; // '2025-11-26T11:08:13Z'
  const expiredDateUTC = new Date(expiredDateUTCString).getTime(); // ms since 1970
  const nowDateUTC = Date.now(); // ms since 1970

  return nowDateUTC >= expiredDateUTC;
};

export const getSignedURL = async (a_Url: string) => {
  const resp = await fetch(`${ESTACURLS.signURL}${a_Url}`);
  /* console.log("resp")
  console.log(resp) */
  if (!resp.ok) {
    const respJSON = await resp.json();
    console.error("Failed to get the signed URL: " + respJSON.message);
    return "";
  }
  const respJSON = await resp.json();
  return respJSON.href;
};

export const readBandCOG = async (
  a_Url: string,
  a_Coordinates: [number, number][],
  a_ItemBBOX: [number, number, number, number],
) => {
  //console.log(new Date(Date.now()).toISOString()+ " fromURL start")
  if (a_Url.length == 0) {
    return null;
  }
  const tiff = await fromUrl(a_Url);
  //console.log(new Date(Date.now()).toISOString()+ " getImage start")
  const image = await tiff.getImage();
  //console.log(new Date(Date.now()).toISOString()+ " readRasters start")
  const window = LngLatToPixel(
    a_Coordinates,
    a_ItemBBOX,
    image.getWidth(),
    image.getHeight(),
  );
  const [raster] = await image.readRasters({ window });
  //console.log(new Date(Date.now()).toISOString()+ " readRasters end")
  return raster;
};

export const LngLatToPixel = (
  a_ROILngLat: [number, number][],
  a_STACItemBBox: [number, number, number, number],
  a_Width: number,
  a_Height: number,
) => {
  const [minLon, minLat, maxLon, maxLat] = a_STACItemBBox;

  const xs = a_ROILngLat.map(([lon]) =>
    Math.floor(((lon - minLon) / (maxLon - minLon)) * a_Width),
  );
  const ys = a_ROILngLat.map(([_, lat]) =>
    Math.floor(((maxLat - lat) / (maxLat - minLat)) * a_Height),
  );

  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);

  return [x0, y0, x1, y1];
};

export const toFloat32Array = (a_Arr: TypedArray): Float32Array => {
  if (a_Arr instanceof Float32Array) return a_Arr;
  return new Float32Array(a_Arr);
};

export const computeFeatureNDVI = (
  a_Red: TypedArray,
  a_Nir: TypedArray,
): Float32Array => {
  const r = toFloat32Array(a_Red);
  const n = toFloat32Array(a_Nir);

  const ndvi = new Float32Array(r.length);

  for (let i = 0; i < r.length; i++) {
    ndvi[i] = (n[i] - r[i]) / (n[i] + r[i]);
  }

  return ndvi;
};

export const getMeanNDVI = (
  a_NDVI: Float32Array<ArrayBufferLike>,
  a_DateTime: string,
) => {
  let sum = 0;
  let count = 0;

  for (const n of a_NDVI) {
    if (!isNaN(n) && isFinite(n)) {
      sum += n; 
      ++count;
    }
  }

  const date = a_DateTime;

  return count > 0
    ? { NDVI: sum / count, datetime: date }
    : { NDVI: null, datetime: date };
};
