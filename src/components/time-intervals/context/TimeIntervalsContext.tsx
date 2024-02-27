import {createContext} from "react";
import {IntervalEventType, PeriodType} from "./TimeIntervalsProvider";

interface TimeIntervalContextProps {
    activePeriod: number;
    setActivePeriod: (value: number) => void;
    periods: PeriodType[];
    getEventList: () => IntervalEventType[];
    numberOfPeriods: number;
    getActivePeriodItem: () => PeriodType;
}
const TimeIntervalsContext = createContext<TimeIntervalContextProps | null>(null);

export default TimeIntervalsContext;