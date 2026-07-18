const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "india-states.geojson");
const output = path.join(__dirname, "..", "public", "india-network-map.svg");
const map = JSON.parse(fs.readFileSync(source, "utf8"));

const width = 620;
const height = 720;
const padding = 28;

function mercatorY(latitude) {
  const radians = (latitude * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + radians / 2));
}

function mercatorX(longitude) {
  return (longitude * Math.PI) / 180;
}

function perpendicularDistance(point, start, end) {
  const [x, y] = point;
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
  return Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1) / Math.hypot(dx, dy);
}

function simplify(points, tolerance) {
  if (points.length < 3) return points;

  let furthestIndex = 0;
  let furthestDistance = 0;
  const lastIndex = points.length - 1;

  for (let index = 1; index < lastIndex; index += 1) {
    const distance = perpendicularDistance(points[index], points[0], points[lastIndex]);
    if (distance > furthestDistance) {
      furthestDistance = distance;
      furthestIndex = index;
    }
  }

  if (furthestDistance <= tolerance) return [points[0], points[lastIndex]];
  return [
    ...simplify(points.slice(0, furthestIndex + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(furthestIndex), tolerance),
  ];
}

function rings(geometry) {
  return geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates.flat();
}

const coordinates = map.features.flatMap((feature) => rings(feature.geometry).flat());
const longitudes = coordinates.map(([longitude]) => mercatorX(longitude));
const latitudes = coordinates.map(([, latitude]) => mercatorY(latitude));
const minLongitude = Math.min(...longitudes);
const maxLongitude = Math.max(...longitudes);
const minLatitude = Math.min(...latitudes);
const maxLatitude = Math.max(...latitudes);
const scale = Math.min(
  (width - padding * 2) / (maxLongitude - minLongitude),
  (height - padding * 2) / (maxLatitude - minLatitude),
);
const offsetX = (width - (maxLongitude - minLongitude) * scale) / 2;
const offsetY = (height - (maxLatitude - minLatitude) * scale) / 2;

function project([longitude, latitude]) {
  return [
    offsetX + (mercatorX(longitude) - minLongitude) * scale,
    offsetY + (maxLatitude - mercatorY(latitude)) * scale,
  ];
}

function ringPath(ring) {
  const projected = simplify(ring.map(project), 0.55);
  return projected
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ") + " Z";
}

const regions = [
  { coords: [75.35, 31.15], name: "Punjab", textOffset: [0, 35] },
  { coords: [77.2, 28.62], name: "Haryana", textOffset: [0, 35] },
  { coords: [74.5, 26.9], name: "Rajasthan", textOffset: [0, 35] },
  { coords: [71.15, 22.7], name: "Gujarat", textOffset: [0, 35] },
  { coords: [78.0, 23.6], name: "Madhya Pradesh", textOffset: [0, 35] },
  { coords: [75.2, 19.65], name: "Maharashtra", textOffset: [0, 35] },
  { coords: [79.15, 18.15], name: "Telangana", textOffset: [0, 35] },
  { coords: [76.2, 15.45], name: "Karnataka", textOffset: [0, 35] },
  { coords: [78.6, 11.2], name: "Tamil Nadu", textOffset: [0, 35] },
  { coords: [88.35, 22.55], name: "West Bengal", textOffset: [0, 35] },
];

const statePaths = map.features
  .map((feature) => `<path class="india-state" d="${rings(feature.geometry).map(ringPath).join(" ")}" />`)
  .join("\n  ");

const pins = regions
  .map((region) => {
    const [x, y] = project(region.coords);
    const [tx, ty] = region.textOffset;
    return `<g class="network-pin" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><circle class="pin-halo" r="15"/><path class="pin-body" d="M0-14c-7.7 0-14 6-14 13.6C-14 9.2 0 24 0 24S14 9.2 14-.4C14-8 7.7-14 0-14Z"/><circle class="pin-center" cy="-0.5" r="4"/><text class="pin-text" x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle">${region.name}</text></g>`;
  })
  .join("\n  ");

const svg = `<!-- Source boundaries: lokesh-krishna/india-shapefiles (MIT), derived from state GeoJSON. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">India distribution network map</title>
  <desc id="desc">Accurate state-boundary map of India with distribution region markers.</desc>
  <style>
    .india-state { fill: #F2F8F2; stroke: #B9D5B7; stroke-width: 0.72; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    .network-pin { filter: drop-shadow(0 4px 6px rgba(25, 91, 49, .18)); }
    .pin-halo { fill: #1F7A3D; opacity: .09; }
    .pin-body { fill: #1F7A3D; }
    .pin-center { fill: #FFFFFF; }
    .pin-text { fill: #1F7A3D; font-size: 10px; font-weight: 600; font-family: system-ui, -apple-system, sans-serif; }
  </style>
  <g>${statePaths}</g>
  <g>${pins}</g>
</svg>`;

fs.writeFileSync(output, svg);
