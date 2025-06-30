import { useState, useEffect } from "react";

interface GeolocationState {
  coords: [number, number] | null;
  isLoading: boolean;
  error: string | null;
  permission: "granted" | "denied" | "prompt" | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    isLoading: false,
    error: null,
    permission: null,
  });

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: [position.coords.latitude, position.coords.longitude],
          isLoading: false,
          error: null,
          permission: "granted",
        });
      },
      (error) => {
        let errorMessage = "Unknown error occurred";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            setState((prev) => ({ ...prev, permission: "denied" }));
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const checkPermission = async () => {
    if (!navigator.permissions) {
      setState((prev) => ({ ...prev, permission: "prompt" }));
      return;
    }

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation" as PermissionName,
      });
      setState((prev) => ({ ...prev, permission: permission.state }));

      permission.onchange = () => {
        setState((prev) => ({ ...prev, permission: permission.state }));
      };
    } catch (error) {
      setState((prev) => ({ ...prev, permission: "prompt" }));
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    ...state,
    getCurrentPosition,
  };
};
