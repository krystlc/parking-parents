import type { LatLngExpression } from "leaflet";

export type Location = {
  name: string;
  latlng: LatLngExpression;
  path: string;
};
