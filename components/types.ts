import type { LatLngExpression } from "leaflet";

export type ParkLocation = {
  name: string;
  latlng: LatLngExpression;
  path: string;
};
