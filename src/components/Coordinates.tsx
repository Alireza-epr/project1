import React, { useEffect, useState } from "react";
import coordinatesStyles from "./Coordinates.module.scss";
import Coordinate from "./Coordinate";
import CButton from "./CButton";
import BrowseButton from "./BrowseButton";
import { LngLat } from "maplibre-gl";
import { ECoordinate } from "../types/coordinateTypes";
import { EMarkerType, IMarker, useMapStore } from "../store/mapStore";
import maplibregl from "maplibre-gl";
import {validateImportedROI} from "../utils/calculationUtils"

export interface ICoordinate {
  id: number | string;
  lngLat: [number, number];
}

export interface IImportedROI {
  coordinates: [number, number][]
}

const Coordinates = () => {
  const markers = useMapStore((state) => state.markers);
  const setMarkers = useMapStore((state) => state.setMarkers);

  /* const [coordinates, setCoordinates] = useState<ICoordinate[]>([
    { id: 1, lngLat: [0, 0] },
    { id: 2, lngLat: [0, 0] },
    { id: 3, lngLat: [0, 0] },
    { id: 4, lngLat: [0, 0] },
  ]); */

  const [disableDraw, setDisableDraw] = useState(true);

  const handleCoordinateChange = (
    a_Id: number | string,
    a_Coordinate: ECoordinate,
    a_Value: string,
  ) => {
    if (isNaN(Number(a_Value))) {
      console.log(
        `Value must be number for ${a_Coordinate} of ${a_Id}: ${a_Value}`,
      );
      return;
    }

    /* setCoordinates((prev) => {
      return prev.map((coord) => {
        if (coord.id !== a_Id) return coord;

        return {
          ...coord,
          lngLat:
            a_Coordinate === ECoordinate.longitude
              ? [Number(a_Value), coord.lngLat[1]]
              : [coord.lngLat[0], Number(a_Value)],
        };
      });
    }); */
  };

  const handleDrawROI = (a_Coordinates: ICoordinate[]) => {
    const markersWithoutMap: IMarker[] = a_Coordinates.map((c) => {
      const markerWithThisCoordinate =
        markers.find((m) => m.marker.getLngLat().lng === c.lngLat[0]) &&
        markers.find((m) => m.marker.getLngLat().lat === c.lngLat[1]);

      const markerElement = new maplibregl.Marker().setLngLat(c.lngLat);

      const markerWithoutMap = {
        type: EMarkerType.polygon,
        marker: markerElement,
      };

      return markerWithThisCoordinate
        ? markerWithThisCoordinate
        : markerWithoutMap;
    });

    setMarkers((prev) => {
      const existingPointMarkers = prev.filter(
        (m) => m.type === EMarkerType.point,
      );
      prev.forEach((m) => {
        m.marker.remove();
      });
      return [...existingPointMarkers, ...markersWithoutMap];
    });
  };

  const handleSelectFile = (a_JSON: Record<string, any>) => {
    const isImportedROIValid = validateImportedROI(a_JSON)

    if(!isImportedROIValid.valid){
      console.error("Failed importing ROI: "+isImportedROIValid.message)
      return
    }

    const importedCoordinates :ICoordinate[] = (a_JSON as IImportedROI).coordinates.map((coordinate, index) => {
        return {
          id: `imported_${index+1}`,
          lngLat: coordinate
        }
    }) 

    handleDrawROI(importedCoordinates)

  }

  /* useEffect(() => {
    if (coordinates.every((c) => c.lngLat.every((l) => l !== 0))) {
      setDisableDraw(false);
    } else {
      setDisableDraw(true);
    }
  }, [coordinates]); */

  /* useEffect(() => {
    if (markers.filter((m) => m.type === EMarkerType.polygon).length !== 0) {
      const marker_1 = markers[0].marker.getLngLat();
      const marker_2 = markers[1].marker.getLngLat();
      const marker_3 = markers[2].marker.getLngLat();
      const marker_4 = markers[3].marker.getLngLat();
      setCoordinates([
        { id: 1, lngLat: [marker_1.lng, marker_1.lat] },
        { id: 2, lngLat: [marker_2.lng, marker_2.lat] },
        { id: 3, lngLat: [marker_3.lng, marker_3.lat] },
        { id: 4, lngLat: [marker_4.lng, marker_4.lat] },
      ]);
    } else {
      setCoordinates([])
    }
  }, [markers]); */

  return (
    <div className={` ${coordinatesStyles.wrapper}`}>
      <BrowseButton
          title="Import ROI"
          onFileSelect={handleSelectFile}
          help={[
            "Minimum 4 coordinates, e.g.:",
            "{",
            "  coordinates: [",
            "    [lng1, lat1],",
            "    [lng2, lat2],",
            "    [lng3, lat3],",
            "    [lng4, lat4]",
            "  ]",
            "}"
          ]}
        />
      {markers.map((m, index) => (
        <Coordinate
          lngLat={[m.marker.getLngLat().lng,m.marker.getLngLat().lat]}
          key={index}
          id={index + 1}
          onCoordinateChange={handleCoordinateChange}
        />
      ))}      
    </div>
  );
};

export default Coordinates;
