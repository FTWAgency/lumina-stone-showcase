import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Dealer {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

interface DealerMapProps {
  dealers: Dealer[];
  selectedDealer: number | null;
  onDealerSelect: (id: number) => void;
}

const DealerMap = ({ dealers, selectedDealer, onDealerSelect }: DealerMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXBmc3VyZmFjZXMiLCJhIjoiY21rNGF6dnc3MDVvbzNrcHZqN3JmaWNtaiJ9.TE4niGdJ6WC1_y4V6WkHHA';

    // Calculate center point between dealers
    const centerLat = dealers.reduce((sum, d) => sum + d.lat, 0) / dealers.length;
    const centerLng = dealers.reduce((sum, d) => sum + d.lng, 0) / dealers.length;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [centerLng, centerLat],
      zoom: 8,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each dealer
    dealers.forEach((dealer) => {
      const el = document.createElement('div');
      el.className = 'dealer-marker';
      el.style.cssText = `
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, hsl(45, 80%, 55%), hsl(35, 85%, 50%));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
      `;
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(220, 30%, 15%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.15)';
        el.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      });
      el.addEventListener('click', () => {
        onDealerSelect(dealer.id);
      });

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'dealer-popup',
      }).setHTML(`
        <div style="padding: 8px 12px; font-family: 'Gotti', sans-serif;">
          <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a;">${dealer.name}</h3>
          <p style="font-size: 12px; color: #666; margin: 0;">${dealer.address}</p>
          <p style="font-size: 12px; color: #666; margin: 0;">${dealer.city}, ${dealer.state} ${dealer.zip}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([dealer.lng, dealer.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [dealers, onDealerSelect]);

  // Handle selected dealer changes
  useEffect(() => {
    if (!map.current || selectedDealer === null) return;

    const dealer = dealers.find(d => d.id === selectedDealer);
    if (dealer) {
      map.current.flyTo({
        center: [dealer.lng, dealer.lat],
        zoom: 12,
        duration: 1000,
      });

      // Open the popup for the selected dealer
      const markerIndex = dealers.findIndex(d => d.id === selectedDealer);
      if (markerIndex !== -1 && markers.current[markerIndex]) {
        markers.current[markerIndex].togglePopup();
      }
    }
  }, [selectedDealer, dealers]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default DealerMap;
