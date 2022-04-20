import React, { useEffect, useState } from "react";
import { LeafletMapTileOptions } from "../types/LeafletMapTileOptions";
import LeafletMapTile from "./LeafletMapTile";
import { readFileAsText, mapCSVToArray } from './helpers';
import {mapArrayToHazardMapCsvItem, HazardMapCsvItem} from "../types/HazardMapCsvItem";

const position = {lat: 38.109350886314026, lng: 140.05015330142717};

const layer1: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（想定最大規模）",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
  position: position,
}
const layer2: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（想定最大規模）_国管理河川",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png",
  position: position,
}
const layer3: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（想定最大規模）_都道府県管理河川",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_pref_data/06/{z}/{x}/{y}.png",
  position: position,
}
const layer4: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（計画規模（現在の凡例））",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l1_shinsuishin_newlegend_data/{z}/{x}/{y}.png",
  position: position,
}
const layer5: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（計画規模（現在の凡例））_国管理河川",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l1_shinsuishin_newlegend_kuni_data/{z}/{x}/{y}.png",
  position: position,
}
const layer6: LeafletMapTileOptions = {
  hazardMapName: "洪水浸水想定区域（計画規模（現在の凡例））_都道府県管理河川",
  hazardMapLayerUrl: "https://disaportaldata.gsi.go.jp/raster/01_flood_l1_shinsuishin_newlegend_pref_data/06/{z}/{x}/{y}.png",
  position: position,
}

var hazardMapList = new Array<HazardMapCsvItem>();
var hazardMapTileOptionsList = new Array<LeafletMapTileOptions>();

const LeafletMap = () => {

  const [csvFile, setCsvFile] = useState<Blob>(new Blob());
  const [hazardMapTileOptionsListState, setHazardMapTileOptionsListState] = useState<LeafletMapTileOptions[]>([]);
  const [isShowMapTile, setIsShowMapTile] = useState<boolean>();

  const makeHazardMapOptions = async() => {
    hazardMapList.forEach(hazardMap => {
      var hazardMapOptions : LeafletMapTileOptions = {
        hazardMapName: hazardMap.name,
        hazardMapLayerUrl: hazardMap.url,
        position: position,
      }
      hazardMapTileOptionsList.push(hazardMapOptions);
    });
    setHazardMapTileOptionsListState(hazardMapTileOptionsList);
  }

  /***
   * CSVファイルを読読み込み、配列hazardMapListに変換する
   */
  const readCSV = async () => {
    try {
      const csv = await readFileAsText(csvFile);
      const arr = mapCSVToArray(csv);
      hazardMapList = mapArrayToHazardMapCsvItem(arr);
    } catch (error) {
      alert(error);
    }
  }

  /**
   * 読み込んだファイルをジオコーディングし、緯度経度に変換する
   */
  const mappingFromCsv = async() => {
    // 一連の処理で値を受け渡す場合は、戻り値で受け取って処理するか、グローバル変数に入れる
    // Stateは非同期処理なので、Stateへの格納が終わる前に次の処理に行ってしまう
    await readCSV();
    await makeHazardMapOptions();
    setIsShowMapTile(true);
  }

  /**
   * inputタグに入力されたファイルを読み込み、バイナリデータcsvFileで保持
   * @param event inputタグのonChangeイベント
   * @returns なし
   */
  const getFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (file === null) {
      return;
    }
    setCsvFile(file);
  }

  return (
    <div>
      <div>
        <input type="file" accept="text/csv" onChange={getFile} />
        <button onClick={() => mappingFromCsv()}>CSVを読み込んで表示</button>
        <br/>
        <br/>
      </div>
      {isShowMapTile && hazardMapTileOptionsListState.map((hazardMap, index) => (
        <LeafletMapTile options={hazardMap}/>
      ))}
      {/* <LeafletMapTile options={layer1}/>
      <LeafletMapTile options={layer2}/>
      <LeafletMapTile options={layer3}/>
      <LeafletMapTile options={layer4}/>
      <LeafletMapTile options={layer5}/>
      <LeafletMapTile options={layer6}/> */}
    </div>
  );  
};

export default LeafletMap;