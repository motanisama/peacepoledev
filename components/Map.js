import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  InfoBox,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { formatRelative, set } from "date-fns";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyles from "./mapStyles";
import { Text } from "@chakra-ui/react";
import { useLocationData } from "../lib/hooks";

const mapContainerStyle = {
  width: "100vw",
  height: "75vh",
};
const center = {
  lat: 19.714312,
  lng: -155.077456,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

export default function Map() {
  const { locations } = useLocationData();
  const [markerOpen, setMarkerOpen] = useState(false);
  const [selected, setSelected] = useState();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
  });

  //maintain state without causing re-render
  const mapRef = useRef();

  //
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={
          selected?.geo
            ? {
                lat: parseFloat(selected.geo.lat),
                lng: parseFloat(selected.geo.lng),
              }
            : center
        }
        options={options}
        onLoad={onMapLoad}
      >
        {locations?.map((pole) => (
          <Marker
            position={{
              lat: parseFloat(pole.geo.lat),
              lng: parseFloat(pole.geo.lng),
            }}
            key={pole.title}
            onClick={() => {
              setSelected(pole);
              console.log(selected);
              mapRef.current.setZoom(17);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            onCloseClick={() => {
              setSelected(null);
              mapRef.current.setZoom(15);
            }}
            position={{
              lat: parseFloat(selected.geo.lat),
              lng: parseFloat(selected.geo.lng),
            }}
            options={{
              pixelOffset: new google.maps.Size(0, -30),
            }}
          >
            <div>
              <h1>{selected.title}</h1>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      style={{ position: "absolute", zIndex: "10", margin: "2rem" }}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            panTo({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Locate me!
    </button>
  );
}
