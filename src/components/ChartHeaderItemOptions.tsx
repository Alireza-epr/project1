
import chartHeaderItemOptionsStyle from "./ChartHeaderItemOptions.module.scss"

export interface ChartHeaderItemOptionsProps {
    active: string,
    options: string[],
    onOption: (a_Valud: string) => void
}

const ChartHeaderItemOptions = (props: ChartHeaderItemOptionsProps) => {
  return (
    <div className={` ${chartHeaderItemOptionsStyle.wrapper}`}>
        {props.options.map((option, index )=>
            <div 
                className={` ${chartHeaderItemOptionsStyle.option}`}
                key={index} 
                onClick={()=>props.onOption(option)}
                style={{
                    backgroundColor: props.active == option ? "greenyellow" : "",
                    color: props.active == option ? "black" : ""
                }}
            >
                {option}
            </div>
        )}
    </div>
  )
}

export default ChartHeaderItemOptions
