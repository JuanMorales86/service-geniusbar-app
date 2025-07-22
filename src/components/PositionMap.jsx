import React from "react";

const MapPosition = ({ center, zoom, markerCoords, popupContent }) => {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  React.useEffect(() => {
    // Aquí verificamos que maplibregl esté disponible en el objeto global 'window'.
    // Ya no es necesario el import() dinámico porque la librería se carga en Layout.astro.
    if (typeof window.maplibregl !== "undefined") {
      if (map.current) return; // initialize map only once

      map.current = new window.maplibregl.Map({
        // Acceso a window.maplibregl
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: center || [-58.3816, -34.6037],
        zoom: zoom || 15,
      });

      if (markerCoords) {
        new window.maplibregl.Marker() // Acceso a window.maplibregl.Marker
          .setLngLat(markerCoords)
          .setPopup(
            new window.maplibregl.Popup().setHTML(
              popupContent ||
                "<h3>Genius Bar Servicio Tecnico</h3><p>Servicio técnico especializado</p>"
            )
          )
          .addTo(map.current);
      }

      map.current.addControl(new window.maplibregl.NavigationControl());
    } else {
      console.error(
        "MapLibre GL no está disponible en el objeto window. Asegúrate de que maplibre-gl.js esté cargado en tu Layout.astro."
      );
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, markerCoords, popupContent]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px' }}
      className="border rounded-lg border-t-black border-3 text-blackep"
    ></div>
  );
};

export default MapPosition;
