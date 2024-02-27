import {FC} from "react";
import "./intervalEvent.scss";

interface IntervalEventProps {
    year: number;
    description: string;
}

const IntervalEvent: FC<IntervalEventProps> = ({year, description}) => {
    return (
        <div className="interval-event">
            <h3 className="interval-event__year">{year}</h3>
            <div className="interval-event__description">{description}</div>
        </div>
    )
}

export default IntervalEvent;