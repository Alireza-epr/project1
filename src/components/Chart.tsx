import { EMarkerType, INDVISample, useMapStore } from "../store/mapStore";
import chartStyles from "./Chart.module.scss";
import { useEffect, useState } from "react";
import ChartFooterItem from "./ChartFooterItem";
import ChartListRows from "./ChartListRows";
import { toFirstLetterUppercase } from "../utils/generalUtils";

export interface IChartProps {
  children: React.ReactNode;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  items?: number;
  latency?: number;
}

const Chart = (props: IChartProps) => {
  const samples = useMapStore((state) => state.samples);
  const markers = useMapStore((state) => state.markers);
  const fetchFeatures = useMapStore((state) => state.fetchFeatures);
  const setFetchFeatures = useMapStore((state) => state.setFetchFeatures);

  const nextPage = useMapStore((state) => state.nextPage);
  const previousPage = useMapStore((state) => state.previousPage);
  const notValidSamples = useMapStore((state) => state.notValidSamples);
  const [maxNDVI, setMaxNDVI] = useState<number>(0);
  const [meanNDVI, setMeanNDVI] = useState<number>(0);
  const [minNDVI, setMinNDVI] = useState<number>(0);

  const [showList, setShowList] = useState(false);
  const [showToggleChart, setShowToggleChart] = useState(false);

  useEffect(() => {
    if (samples.length !== 0) {
      let max = -Infinity;
      let min = Infinity;
      let sum = 0;
      let count = 0;
      for (const s of samples) {
        if (s.meanNDVI) {
          if (s.meanNDVI > max) {
            max = s.meanNDVI;
          }
          if (s.meanNDVI < min) {
            min = s.meanNDVI;
          }
          sum += s.meanNDVI;
          ++count;
        }
      }
      setMaxNDVI(max);
      setMinNDVI(min);
      setMeanNDVI(count > 0 ? sum / count : 0);
    } else {
      setMaxNDVI(0);
      setMeanNDVI(0);
      setMinNDVI(0);
    }
  }, [samples]);

  useEffect(()=>{
    const hasPolygon = markers.filter( m => m.type === EMarkerType.polygon ).length === 4 
    const hasPoint = markers.filter( m => m.type === EMarkerType.point ).length === 1 
    if(hasPolygon && hasPoint){
      setShowToggleChart(true)
    } else {
      setShowToggleChart(false)
    }
  },[])

  const getValidity = () => {
    return props.items ? `${samples.length}/${props.items}` : "-";
  };

  const handleListItems = () => {
    setShowList(!showList);
  };

  const handleToggleChart = () => {
    const nextFetchFeatures = fetchFeatures === EMarkerType.polygon ? EMarkerType.point : EMarkerType.polygon
    setFetchFeatures(nextFetchFeatures)
  }

  return (
    <div className={` ${chartStyles.wrapper}`}>
      <div className={` ${chartStyles.buttonsWrapper}`}>
        <div className={` ${chartStyles.title}`}>
          {
            `Chart of ${toFirstLetterUppercase(fetchFeatures)}`
          }
        </div>
        {showToggleChart ? (
          <div className={` ${chartStyles.button}`} title="Toggle Chart">
            <img src="/images/toggle.svg" alt="Toggle Chart" onClick={handleToggleChart} />
          </div>
        ) : (
          <></>
        )}
        <div className={` ${chartStyles.button}`} title="List">
          <img src="/images/list.svg" alt="List" onClick={handleListItems} />
        </div>
        <div className={` ${chartStyles.button}`} onClick={props.onClose}>
          X
        </div>
      </div>
      {showList ? (
        <div className={` ${chartStyles.listWrapper}`}>
          <ChartListRows items={[...samples, ...notValidSamples]} />
        </div>
      ) : (
        <></>
      )}
      <div className={` ${chartStyles.children}`}>
        {previousPage && props.onPrevious && (
          <div
            className={`${chartStyles.arrow} ${chartStyles.previous}`}
            onClick={props.onPrevious}
          >
            <img
              src="/images/prev-page.svg"
              alt="previous-page"
              title="Previous Page"
            />
          </div>
        )}
        {props.children}
        {nextPage && props.onNext && (
          <div
            className={`${chartStyles.arrow} ${chartStyles.next}`}
            onClick={props.onNext}
          >
            <img
              src="/images/next-page.svg"
              alt="next-page"
              title="Next Page"
            />
          </div>
        )}
      </div>
      <div className={` ${chartStyles.footer}`}>
        <ChartFooterItem title="Max NDVI" value={maxNDVI} />
        <ChartFooterItem title="Mean NDVI" value={meanNDVI} />
        <ChartFooterItem title="Min NDVI" value={minNDVI} />
        <ChartFooterItem
          title="Latency"
          value={props.latency ? `${(props.latency/1000).toFixed(2)} s` : "-"}
        />
        <ChartFooterItem title="Validity" value={getValidity()} />
      </div>
    </div>
  );
};

export default Chart;
