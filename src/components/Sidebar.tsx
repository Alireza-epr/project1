import sidebarStyles from "./Sidebar.module.scss";
import CButton from "../components/CButton";
import { EMarkerType, TMarker, useMapStore } from "../store/mapStore";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const marker = useMapStore((state) => state.marker);
  const setMarker = useMapStore((state) => state.setMarker);

  const markers = useMapStore((state)=> state.markers)
  const setMarkers = useMapStore((state)=> state.setMarkers)

  const showChart = useMapStore((state)=> state.showChart)
  const setShowChart = useMapStore((state)=> state.setShowChart)

  const handlePointClick = () => {
    setMarker((prev)=>{
      if(prev.point){
        return {
          ...prev,
          point: false
        }
      } else {
        const markerKeys = Object.keys( prev )
        let newMarker = {} as any
        for(const key of markerKeys ){
          newMarker[key] = key == EMarkerType.point
        }
        return newMarker
      }
    })
  };

  const handlePolygonClick = () => {
    setMarker((prev)=>{
      if(prev.polygon){
        return {
          ...prev,
          polygon: false
        }
      } else {
        const markerKeys = Object.keys( prev )
        let newMarker = {} as any
        for(const key of markerKeys ){
          newMarker[key] = key == EMarkerType.polygon
        }
        return newMarker
      }
    })
  };

  const handleClearPoint = () => {
    setMarkers( (prev)=> {
      prev.forEach( m => {
        if(m.type === EMarkerType.point){
          m.marker.remove()
        }
      })
      return prev.filter( m => m.type !== EMarkerType.point )
    })
  }

  const handleClearPolygon = () => {
    setMarkers( (prev)=> {
      prev.forEach( m => {
        if(m.type === EMarkerType.polygon){
          m.marker.remove()
        } 
      })
      return prev.filter( m => m.type !== EMarkerType.polygon )
    })
  }

  const handleSetStaticChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className={` ${sidebarStyles.wrapper}`}>
      <div className={` ${sidebarStyles.buttonsWrapper}`}>
        <CButton
          title={!marker.point ? "Enable Marker" : "Disable Marker"}
          onButtonClick={handlePointClick}
        />
        <CButton
          title={"Clear Points"}
          onButtonClick={handleClearPoint}
          disable={markers.filter( m => m.type == EMarkerType.point ).length == 0}
        />
        <CButton
          title={!marker.polygon ? "Enable ROI" : "Disable ROI"}
          onButtonClick={handlePolygonClick}
        />
        <CButton
          title={"Clear Polygon"}
          onButtonClick={handleClearPolygon}
          disable={markers.filter( m => m.type == EMarkerType.polygon ).length < 4}
        />
        <CButton
          title={!showChart ? "Static Chart" : "Hide Chart"}
          onButtonClick={handleSetStaticChart}
          disable={markers.filter( m => m.type == EMarkerType.polygon ).length < 4}
        />
      </div>
    </div>
  );
};

export default Sidebar;
