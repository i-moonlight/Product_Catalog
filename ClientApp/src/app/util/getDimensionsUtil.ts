import {HostListener} from "@angular/core";
import {ScreenDimensionsEnum} from "@enums/screen-dimensions";

//variables
let screenWidth: number = 0;
//objects
const deviceType: Array<{ deviceType: string; isEnable: boolean }> = [
  {deviceType: "Tablet", isEnable: false},
  {deviceType: "Laptop", isEnable: false}
];

export function identifyDeviceType(innerWidth: number): Array<{ deviceType: string; isEnable: boolean }> {
  screenWidth = innerWidth;
  //innerWidth returns the width of the window's layout viewport
  if(screenWidth <= ScreenDimensionsEnum.tablet) {
    deviceType[0].isEnable = true;
    deviceType[1].isEnable = false;
  }
  else if(screenWidth >= ScreenDimensionsEnum.laptop){
    deviceType[0].isEnable = false;
    deviceType[1].isEnable = true;
  }

  return [
    {deviceType: "Tablet", isEnable: deviceType[0].isEnable},
    {deviceType: "Laptop", isEnable: deviceType[1].isEnable}
  ]


}

