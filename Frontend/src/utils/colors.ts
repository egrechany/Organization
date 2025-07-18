function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function lightenColorLinear(hex: string, percent: number) {
  let rgb: { r: number; g: number; b: number } = hexToRgb(hex);
  let r = Math.round(rgb.r + ((255 - rgb.r) * percent) / 100);
  let g = Math.round(rgb.g + ((255 - rgb.g) * percent) / 100);
  let b = Math.round(rgb.b + ((255 - rgb.b) * percent) / 100);
  return rgbToHex(r, g, b);
}

export function darkenColor(color: string, percent: number) {
  let r, g, b;
  if (color.startsWith("#")) {
    // Convert HEX to RGB
    const hex = color.slice(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } 
  const factor = 1 - percent / 100;
  r = Math.max(0, Math.min(255, Math.round(r || 1 * factor)));
  g = Math.max(0, Math.min(255, Math.round(g || 1 * factor)));
  b = Math.max(0, Math.min(255, Math.round(b || 1 * factor)));

  // Convert back to HEX
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getContrastYIQ(hexcolor: string): string {
  var r = parseInt(hexcolor.substring(1, 3), 16);
  var g = parseInt(hexcolor.substring(3, 5), 16);
  var b = parseInt(hexcolor.substring(5, 7), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
}
