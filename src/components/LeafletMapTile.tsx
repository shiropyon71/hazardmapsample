import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMapTileOptions } from "../types/LeafletMapTileOptions";

// マップ表示に必要　→ MapContainerでもstyleを指定しないとダメ
import "leaflet/dist/leaflet.css";

// Marker表示に必要  --  ↓ここから
import Leaflet, { LatLng } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// marker setting
let DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;
// Marker表示に必要  --  ↑ここまで

type leafletMapTileOptionsPropsType = {
  options: LeafletMapTileOptions;
}

const LeafletMapTile = (optionProps: leafletMapTileOptionsPropsType) => {
  const {options} = optionProps;

  return (
    <div className="maptile">
      <div>{options.hazardMapName}</div>
      <MapContainer center={options.position} zoom={17} style={{ height: "400px", width: "400px"}}>
        <TileLayer
          attribution='&copy; <a href="http://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a> contributors'
          url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
          minZoom={17}
          maxZoom={17}
        />
        <TileLayer
          url={options.hazardMapLayerUrl}
          minZoom={17}
          maxZoom={17}
        />
        <Marker position={options.position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
export default LeafletMapTile;