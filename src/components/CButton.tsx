import { Style } from "maplibre-gl";
import buttonStyles from "./CButton.module.scss";

export interface ICButtonProps {
  title: string;
  onButtonClick: () => void;
  disable?: boolean
}
const CButton = (props: ICButtonProps) => {

  const handleButtonClick = () => {
    if(props.disable){
      return 
    } else {
      props.onButtonClick()
    }
  }

  return (
    <div 
      className={` ${buttonStyles.wrapper}`} 
      onClick={handleButtonClick}
      style={{
        backgroundColor: props.disable ? "grey" : "",
        color: props.disable ? "darkgray" : "",         
      }}
    >
      <div className={` ${buttonStyles.button}`}>{props.title}</div>
    </div>
  );
};

export default CButton;
