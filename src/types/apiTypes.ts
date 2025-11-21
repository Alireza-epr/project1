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

// CloudCover
export type TCloudCoverArgs = [
  {
    property: "eo:cloud_cover";
  },
  number,
  number?,
];
export type TCloudCoverFilter = {
  op: TComparisonOperators, 
  args: TCloudCoverArgs
}

// DateTime
export type TDateTimeArgs = [
  {
    property: "datetime";
  },
  {
    timestamp?: string;
    interval?: string[];
  },
];
export type TDateTimeFilter = {
  op: TComparisonOperators | TTemporalComparison, 
  args: TDateTimeArgs
}

// Id
export type TIdArgs = [
  {
    property: "id";
  },
  string,
];
export type TIdFilter = {
  op: TComparisonOperators, 
  args: TIdArgs
}

// Spatial
export type TSpatialArgs = [
  {
    property: "geometry";
  },
  IGeometry,
];
export type TSpatialFilter = {
  op: TSpatialComparison, 
  args: TSpatialArgs
}

export interface ISTACFilterOP {
  op:
    | TComparisonOperators
    | TLogicalOperators
    | TTemporalComparison
    | TSpatialComparison;
  args: TCloudCoverArgs | TDateTimeArgs | TIdArgs;
}

export interface ISTACFilter {
  op: TLogicalOperators,
  args: (TCloudCoverFilter | TDateTimeFilter | TIdFilter | TSpatialFilter)[]
}

export interface ISTACFilterRequest {
  collections: [ESTACCollections];
  filter?: ISTACFilter;
}

export interface ISTACResponseLink {
    rel: string, // "root" "self"
    type: string, // "application/json"
    href: string // https link
}

export enum ESTACResponseType {
  FeatureCollection = "FeatureCollection"
}

export interface ISTACResponseFeature {
  type: "Feature";
  stac_version: string;
  stac_extensions: string[];
  id: string;
  collection: string;
  bbox: number[];
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: IStacProperties;
  assets: Record<string, IStacAsset>;
  links: IStacLink[];
}

export interface IStacProperties {
  gsd: number;
  created: string;
  expires: string;
  updated: string;
  datetime: string;
  "eopf:processing_level"?: string;
  "sat:orbit_state"?: string;
  "sat:relative_orbit"?: number;
  [key: string]: any;
}

export interface IStacAsset {
  href: string;
  title?: string;
  type: string;
  roles?: string[];
  data_type?: string;
  gsd?: number;
  nodata?: number;

  // Raster properties
  "raster:offset"?: number;
  "raster:scale"?: number;

  // File metadata
  "file:checksum"?: string;
  "file:size"?: number;
  "file:local_path"?: string;

  // Projection metadata
  "proj:code"?: string;
  "proj:bbox"?: number[];
  "proj:shape"?: number[];
  "proj:transform"?: number[];

  // Alternate access
  alternate?: Record<string, unknown>;
  "alternate:name"?: string;

  // Storage references
  "storage:refs"?: string[];
  "auth:refs"?: string[];

  [key: string]: any;
}

export interface IStacLink {
  href: string;
  rel: string;
  type?: string;
  title?: string;
}

export interface ISTACFilterResponse {
  features: ISTACResponseFeature[],
  links: ISTACResponseLink[],
  numberReturned: number,
  type: ESTACResponseType
}
