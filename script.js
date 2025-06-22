fetch("data.json")
  .then(response => response.json())
  .then(points => {
    const map = L.map("map").setView([50, 30], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const cluster = L.markerClusterGroup();

    points.forEach(p => {
      const icon = L.divIcon({
        html: `<img class="vril-icon" src="icon.png" style="--speed: ${Math.max(1, 100 / Math.abs(p.vril || 1))}s;" />`,
        className: "custom-icon",
        iconSize: [20, 20]
      });

      const marker = L.marker([p.lat, p.lon], { icon });
      marker.bindPopup(`
        <b>${p.city}, ${p.country}</b><br>
        Вриль: ${p.vril.toFixed(1)}<br>
        ${p.desc}
      `);

      cluster.addLayer(marker);
    });

    map.addLayer(cluster);
  })
  .catch(error => console.error("Ошибка при загрузке данных:", error));
