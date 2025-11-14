import sidebarStyles from "@/components/Sidebar.module.scss"
import CButton from "@/components/CButton"
import { useMapStore } from "@/store/mapStore"

const Sidebar = () => {

  const enableMarker = useMapStore( state => state.enableMarker)
  const setEnableMarker = useMapStore( state => state.setEnableMarker)

  const enableROI = useMapStore( state => state.enableROI)
  const setEnableROI = useMapStore( state => state.setEnableROI)

  const handleSetMarkerClick = () => {
    setEnableMarker(!enableMarker)
  }

  const handleSetROIClick = () => {
    setEnableROI(!enableROI)
  }

  return (
    <div className={` ${sidebarStyles.wrapper}`}>
      <CButton 
        title={ !enableMarker ? "Enable Marker" : "Disable Marker" }
        onButtonClick={handleSetMarkerClick}
      /> 
      <CButton 
        title={ !enableROI ? "Enable ROI" : "Disable ROI" }
        onButtonClick={handleSetROIClick}
      /> 
    </div>
  )
}

export default Sidebar
