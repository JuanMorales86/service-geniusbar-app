// src/components/googleMaps.ts o src/utils/googleMaps.ts

interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
  apiKey: string;
}

// Declaración global para la función de callback de Google Maps
declare global {
  interface Window {
    initMap: () => void;
  }
}

export function loadAndInitMap(mapElementId: string, options: MapOptions): void {
  const mapElement = document.getElementById(mapElementId);

  if (!mapElement) {
    console.error(`Element with ID '${mapElementId}' not found.`);
    return;
  }

  const initMap = async () => { // Marcamos la función como async porque importLibrary es asíncrona
    if (!options.apiKey) {
      console.error("Google Maps API key is missing.");
      return;
    }

    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;


    const map = new Map(mapElement, {
      center: options.center,
      zoom: options.zoom,
      mapId: "DEMO_MAP_ID", // Es requerido para Advanced Markers. Puedes usar "DEMO_MAP_ID" o crear uno en GCP.
    });

    // Añadir un marcador avanzado
    new AdvancedMarkerElement({
      position: options.center, // Usa las mismas coordenadas que el centro para el marcador
      map: map,
      title: "Tu Negocio",
    });
  };

  // Comprueba si la API ya está cargada antes de intentar cargarla de nuevo
  if (typeof google !== 'undefined' && google.maps) {
    initMap();
  } else {
    // Si no está cargada, crea un script para cargarla
    const script = document.createElement('script');
    // Ahora cargamos las bibliotecas 'maps' y 'marker' explícitamente en la URL
    script.src = `https://maps.googleapis.com/maps/api/js?key=${options.apiKey}&callback=initMap&libraries=maps,marker`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap; // Hace que initMap sea accesible globalmente para el callback
    document.head.appendChild(script);
  }
}