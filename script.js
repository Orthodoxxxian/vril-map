fetch("data.json").then(r=>r.json()).then(points=>{
  const map = L.map("map").setView([50,30],4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  const cluster = L.markerClusterGroup();
  points.forEach(p=>{
    const icon = L.divIcon({
      html: `<img class="vril-icon" src="icon.png" style="--speed: ${Math.max(1, 100 / Math.abs(p.vril || 1))}s;" />`,
      className: "",
      iconSize: [20, 20]
    });
    const m = L.marker([p.lat,p.lon],{icon});
    m.bindPopup(`<b>${p.city}, ${p.country}</b><br>
      Вриль: ${p.vril.toFixed(1)}<br>
      ${p.desc}, ${p.temp}°C`);
    cluster.addLayer(m);
  });
  map.addLayer(cluster);
});
