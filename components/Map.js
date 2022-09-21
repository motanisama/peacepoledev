import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { formatRelative, set } from "date-fns";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyles from "./mapStyles";

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
  styles: mapStyles,
};

const style = {};

export default function Map(props) {
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
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker id={"1"} position={{ lat: 19.7182864, lng: -155.0792797 }} />
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
