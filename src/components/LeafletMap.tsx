import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMapTileOptions } from "../types/LeafletMapTileOptions";
import LeafletMapTile from "./LeafletMapTile";

const position = {lat: 38.109350886314026, lng: 140.05015330142717};

const layer1: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（想定最大規模）",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png",
  position: position,
}
const layer2: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（想定最大規模）_国管理河川",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png",
  position: position,
}

const LeafletMap = () => {
  return (
    <div>
      <LeafletMapTile options={layer1}/>
      <LeafletMapTile options={layer2}/>
    </div>
  );  
};


export default LeafletMap;