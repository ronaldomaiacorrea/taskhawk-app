/**
 * Converts a hexadecimal color code to an RGBA color code.
 *
 * @param hex - The hexadecimal color code to convert.
 * @param alpha - The alpha value of the RGBA color code.
 * @returns The RGBA color code.
 */
export const hexToRgba = (hex: string, alpha: number) => {
  const bigint = parseInt(hex?.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};
