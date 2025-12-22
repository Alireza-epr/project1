import { INDVISample, useMapStore } from "../store/mapStore";
import customTooltipStyles from "./CustomTooltip.module.scss";
import { TooltipContentProps } from "recharts";
import CustumTooltipItem from "./CustumTooltipItem";
import { getDatetime } from "../utils/dateUtils";

const CustomTooltip = (props: TooltipContentProps<string, string>) => {
    const smoothingWindow = useMapStore((state) => state.smoothingWindow);
  if (props.active && props.payload && props.payload.length) {
    const ndviSample: INDVISample = props.payload[0].payload;
    return (
      <div className={` ${customTooltipStyles.wrapper}`}>
        <CustumTooltipItem
          label={"Date"}
          value={getDatetime(ndviSample.datetime)}
        />
        <CustumTooltipItem
          label={"Mean"}
          value={ndviSample.meanNDVI ?? "N/A"}
        />
        { smoothingWindow !== "1"
          ? <CustumTooltipItem
              label={"Mean (Smoothed)"}
              value={ndviSample.meanNDVISmoothed ?? "N/A"}
            />
          : <></>
        }
        <CustumTooltipItem
          label={"Median"}
          value={ndviSample.medianNDVI ?? "N/A"}
        />
        { smoothingWindow !== "1"
          ? <CustumTooltipItem
              label={"Median (Smoothed)"}
              value={ndviSample.medianNDVISmoothed ?? "N/A"}
            />
          : <></>
        }
        <CustumTooltipItem label={"Valid Pixels"} value={ndviSample.n_valid} />
        <CustumTooltipItem
          label={"Valid Fraction"}
          value={ndviSample.valid_fraction}
        />
        <CustumTooltipItem label={"Filter"} value={ndviSample.filter} />
        <CustumTooltipItem
          label={"Filter Fraction"}
          value={ndviSample.filter_fraction}
        />
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
