import sidebarStyles from "@/components/Sidebar.module.scss"
import CButton from "@/components/CButton"
import { useMapStore } from "@/store/mapStore"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

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

  //TODO: define series page
  const [ showChart, setShowChart ] = useState<boolean>(false)
  const handleSetStaticChart = () => {
    setShowChart(!showChart)
  }

  const sampleData = [
    { date: '2025-01-01', ndvi: 0.4 },
    { date: '2025-02-01', ndvi: 0.5 },
    { date: '2025-03-01', ndvi: 0.55 },
  ];

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
      <CButton 
        title={ !showChart ? "Static Chart" : "Hide Chart" }
        onButtonClick={handleSetStaticChart}
      /> 
      { showChart 
        ?
          <div className={` ${sidebarStyles.staticChart}`}>
            {/* resize automatically */}
            <ResponsiveContainer width="100%" height="100%">
              {/* array of objects */}
              <LineChart data={sampleData}>
                <XAxis dataKey="date" />
                {/* Y automatically scale to fit the data */}
                <YAxis />
                {/* popup tooltip by hovering */}
                <Tooltip />
                <Line type="linear" dataKey="ndvi" stroke="#2ecc71" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        :
          <></>
      }
      
    </div>
  )
}

export default Sidebar
