
export interface HazardMapCsvItem {
  no: number;
  name: string;
  url: string;
}

export function mapArrayToHazardMapCsvItem(data: string[][]): HazardMapCsvItem[] {

  var retList = Array<HazardMapCsvItem>();
  // 先頭と末尾は除外
  for (var i = 0; i < data.length - 1; i++) {
    var value : HazardMapCsvItem = {
      no: Number.parseInt(data[i][0]),
      name: data[i][1].replaceAll('"',""),
      url: data[i][2].replaceAll('"',""),
    }
    retList.push(value);
  }

  return retList;
}
