import { MapOptions } from "leaflet";
import { memo, ReactNode } from "react";
import * as ReactLeaflet from "react-leaflet";

interface MapProps extends MapOptions {
  children: ReactNode;
}

const DynamicMap = ({ children, ...other }: MapProps) => {
  return (
    <ReactLeaflet.MapContainer className="w-full h-full relative z-50" {...other}>
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default memo(DynamicMap);
