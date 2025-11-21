import { IGeometry } from "./geoJSON";

export enum ESTACURLS {
  baseURL = "https://catalogue.dataspace.copernicus.eu/stac",
  searchURL = "https://stac.dataspace.copernicus.eu/v1/search",
  collectionsURL = "https://stac.dataspace.copernicus.eu/v1/collections",
  queryablesURL = "https://stac.dataspace.copernicus.eu/v1/queryables",
  featureJSONURL = "https://geojson.org/schema/Feature.json",
}

export enum ESTACCollections {
  Sentinel2l2a = "sentinel-2-l2a",
}

export type TComparisonOperators = "=" | "<>" | "<" | "<=" | ">" | ">=";

export type TLogicalOperators = "and" | "or" | "not" | "between" | "in";

export type TSpatialComparison =
  | "s_intersects"
  | "s_within"
  | "s_contains"
  | "s_crosses"
  | "s_disjoint"
  | "s_equals"
  | "s_overlaps"
  | "s_touches";

export type TTemporalComparison =
  | "t_starts"
  | "t_startedby"
  | "t_overlaps"
  | "t_overlappedby"
  | "t_metby"
  | "t_meets"
  | "t_intersects"
  | "t_finishes"
  | "t_finishedby"
  | "t_equals"
  | "t_during"
  | "t_disjoint"
  | "t_before"
  | "t_contains"
  | "t_after";

export type TCloudCoverFilter = [
  {
    property: "eo:cloud_cover";
  },
  number,
  number?,
];

export type TDateTimeFilter = [
  {
    property: "datetime";
  },
  {
    timestamp?: string;
    interval?: string[];
  },
];

export type TIdFilter = [
  {
    property: "id";
  },
  string,
];

export type TSpatialFilter = [
  {
    property: "geometry";
  },
  IGeometry,
];

export interface ISTACFilterOP {
  op:
    | TComparisonOperators
    | TLogicalOperators
    | TTemporalComparison
    | TSpatialComparison;
  args: TCloudCoverFilter | TDateTimeFilter | TIdFilter;
}

export interface ISTACFilterRequest {
  collections: [ESTACCollections];
  filter?: ISTACFilterOP;
}
