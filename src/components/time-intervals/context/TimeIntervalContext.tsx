import {createContext} from "react";

interface TimeIntervalContextProps {
    period: number;
}
const TimeIntervalContext = createContext<TimeIntervalContextProps | null>(null);