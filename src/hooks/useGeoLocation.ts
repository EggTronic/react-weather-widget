/* eslint-disable */
import { useEffect, useState } from 'react';

export interface GeoLocationSensorState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error?: Error | PositionError;
  once: boolean;
  shouldDetectLocation: boolean;
}

const useGeolocation = (hasGeo: boolean, options?: PositionOptions): GeoLocationSensorState => {
  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
    once: true,
    shouldDetectLocation: true
  });

  if (hasGeo && state.shouldDetectLocation) {
    setState({
      ...state,
      shouldDetectLocation: false,
      loading: false,
    })
  }

  let finishOnce = false;
  let mounted = true;
  let watchId: any;

  const onEvent = (event: any) => {
    if (mounted && !finishOnce) {
      setState({
        ...state,
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp
      });
      if (state.once) {
        finishOnce = true;
      }
    }
  };
  const onEventError = (error: PositionError) =>
    mounted && setState(oldState => ({ ...oldState, loading: false, error }));

  useEffect(() => {
    if (state.shouldDetectLocation) {
      navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
      watchId = navigator.geolocation.watchPosition(onEvent, onEventError, options);
    }

    return () => {
      mounted = false;
      if (state.shouldDetectLocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return state;
};

export default useGeolocation;