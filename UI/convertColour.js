/**this method was borrowed from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
export const convertHexToRGB =(hex)=> {
  const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
   const g = (bigint >> 8) & 255;
   const b = bigint & 255;
  return [r, g, b];
}

export const rgbToHex = (rgb) => {
  /*array*/
  const hex = rgb.map((el) => {
    const hexPair = el.toString(16);
    return hexPair.length === 1 ? '0' + hexPair : hexPair;
  });
  return hex.join('');
};

export const convertArrToRGB = (arr) => {
  const rgbString = 'rgb(';
  return rgbString + arr.toString() + ')';
};


/*****************************HSL****************************** */
//https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/

export function convertRGBtoHSL(rgb){
  let S;
  let L;
  let H;
  //If all RGB values are equal you have a shade of grey and there is no Saturation. 
  //Depending on how bright it’s somewhere between black and white. 
  //If there is no Saturation, we don’t need to calculate the Hue.
  if(rgb[0]===rgb===[1]===rgb[2]){
    H=0;
    S=0;
    L=rgb[0]/255*100;//all equal, calculate only lightness (bottom to top=>0 to 100%=>black to white)
    //grey colour, left side of colourpicker, can be dark or light grey colour
    return [H,S,L];
  }


  //Convert the RGB values to the range 0-1, this can be done by dividing the value by 255 for 8-bit color depth
  const r=rgb[0]/255;
  const g=rgb[1]/255;
  const b=rgb[2]/255;
  const arrRGBrange=[r,g,b];
  //Find the minimum and maximum values of R, G and B.
  const min=Math.min(r,g,b);
  const max=Math.max(r,g,b); 
  
  //calculate the Luminace value by adding the max and min values and divide by 2
  L=Math.round((min+max)/2*100);//(0.025+0.0258)/2 *100% so we need %, otherwise we get 0 when round

  //calculate the Saturation
  //if min and max value are the same, it means that there is no saturation, so saturation is 0, if saturation 0, hue=0   
  if(min===max){ 
    H=0;     
    S=0;  
    return[H,S,L];
  } else if(L<=50){
    S=Math.round((max-min)/(max+min)*100);
    console.log(S)
  } else if(L>50){
    S=Math.round(( max-min)/(2-max-min)*100);
  }


  //calculate the hue
  let hue;
  switch(max){
    case arrRGBrange[0]:/*red*/ //if max===arrRGBrange[0]
      hue = (arrRGBrange[1]-arrRGBrange[2])/(max-min);
      break;
    case arrRGBrange[1]:/*green*/
      hue=2 + (arrRGBrange[2]-arrRGBrange[0])/(max-min);
      break;
    case arrRGBrange[2]:/*blue */
      hue = 4 + (arrRGBrange[0]-arrRGBrange[1])/(max-min);
      break;

  }
  console.log(hue)
  //conver hue colour to degree for colour weel
   H= Math.round(hue*60); //round to integer

  //If H becomes negative add 360 to, because a circle has 360 degrees
   if(H<0){
    H+=360;
   }

  console.log(H,S,L)
  return [H,S,L];
};




/*Not accurate convertHSLtoRGB, should review and solve!*/
export function convertHSLtoRGB(hsl){
 if(hsl[1]===0){
  //If there is no Saturation it means that it’s a shade of grey. 
  //So in that case we just need to convert the Lightness and set R,G and B to that level.
  const r=l/100*255;
  const g=l/100*255;
  const b=l/100*255;
  return [r,g,b];
 }

 const s=hsl[1]/100;
 const l=hsl[2]/100;

 let tempV1;
 if(l<0.5){
  tempV1=l*(1+s);
 }else{/*l>=0.5*/
  tempV1=l+s-(l*s);
}
let tempV2=2*l-tempV1;
//convert the 360 degrees in a circle to 1 by dividing the angle by 360
const hue=hsl[0]/360;

//All values need to be between 0 and 1. In our case all the values are between 0 and 1
const validateRange = (value)=>{
  if(value<0){
    return value+1;
  } else if(value>1){
    return value-1;
  } 
  return value;
}

let temporary_R = validateRange(hue + 0.333);
let temporary_G = validateRange(hue);
let temporary_B = validateRange(hue - 0.333);

//tests for colour
const convertChannel=(tempColour)=>{//
  if(6*tempColour < 1){
    return tempV2 + (tempV1-tempV2)*6*tempColour;
  } else if(2*tempColour<1){
    return tempV1;
  } else if(3*tempColour <2){
    return tempV2+(tempV1-tempV2)*(0.666-tempColour)*6;
  } 
    return tempV2;
}//this will return value from 0 to 1

//convert

const r=Math.min(Math.floor(convertChannel(temporary_R)*256), 255);
const g=Math.min(Math.floor(convertChannel(temporary_G)*256), 255);
const b=Math.min(Math.floor(convertChannel(temporary_B)*256),255);
/**const r=Math.round(convertChannel(temporary_R)*256), 255);
const g=Math.round(convertChannel(temporary_G)*255);
const b=Math.round(convertChannel(temporary_B)*255); */

return [r,g,b];
}


