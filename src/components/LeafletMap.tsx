import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// マップ表示に必要　→ MapContainerでもstyleを指定しないとダメ
import "leaflet/dist/leaflet.css";

// Marker表示に必要  --  ↓ここから
import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// marker setting
let DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;
// Marker表示に必要  --  ↑ここまで

const LeafletMap = () => {
  return (
    <MapContainer center={[38.109350886314026, 140.05015330142717]} zoom={17} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a> contributors'
        url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
      />
      <TileLayer
        url="https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png"
      />
      <TileLayer
        url="https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png"
      />
      <Marker position={[38.109350886314026, 140.05015330142717]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );  
};


export default LeafletMap;