import TimeIntervalsProvider, {PeriodType} from "./context/TimeIntervalsProvider";
import "./timeInterval.scss";
import {FC} from "react";
import Periods from "./periods/Periods";
import EventSlider from "./event-slider/EventSlider";

interface TimeIntervalProps {
    title: string;
    list: PeriodType[]
}

const TimeIntervals: FC<TimeIntervalProps> = ({list, title}) => {
    return (
        <TimeIntervalsProvider periodList={list}>
            <div className="back-plate">
                <div className="back-plate__vertical-line"></div>
                <div className="back-plate__horizontal-line"></div>
                <div className="back-plate__ellipse"></div>
            </div>

            <div className="time-intervals__title-block">
                <div className="time-intervals__line"></div>
                <div className="time-intervals__title">{title}</div>
            </div>
            <div className="time-intervals__wrapper">
                <div className="time-intervals__period">
                    <Periods/>
                </div>

                <div className="time-intervals__slider">
                    <EventSlider/>
                </div>
            </div>


        </TimeIntervalsProvider>
    )
}

export default TimeIntervals;