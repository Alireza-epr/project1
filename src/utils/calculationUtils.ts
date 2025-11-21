export function getReflectanceConverter(asset: {
  ["raster:scale"]?: number;
  ["raster:offset"]?: number;
}) {
  const scale = asset["raster:scale"] ?? 1;
  const offset = asset["raster:offset"] ?? 0;

  return (dn: number) => dn * scale + offset;
}