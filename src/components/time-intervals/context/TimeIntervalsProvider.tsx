import {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import TimeIntervalsContext from "./TimeIntervalsContext";

export type IntervalEventType = {
    year: number;
    description: string;
}

export type PeriodType = {
    id: string;
    title: string;
    yearStart: number;
    yearEnd: number;
    eventsList: IntervalEventType[]
}

interface TimeIntervalsProviderProps {
    children: ReactNode | ReactNode[];
    periodList: PeriodType[];
}

const TimeIntervalsProvider: FC<TimeIntervalsProviderProps> = ({children, periodList}) => {
    const [activePeriod, setActivePeriod] = useState(1);
    const [periods, setPeriods] = useState<PeriodType[]>(periodList);

    useEffect(() => {
        setPeriods(periodList);
    }, [periodList]);

    const getActivePeriodItem = useCallback(
        (): PeriodType => {
            return periods[activePeriod - 1]
        },
        [periods, activePeriod],
    );

    const getEventList = useCallback((): IntervalEventType[] => {
        return periods[activePeriod - 1].eventsList;
    }, [periods, activePeriod])

    const numberOfPeriods = useMemo(() => periods.length, [periods]);

    const contextValue = useMemo(() => {
        return {
            activePeriod,
            setActivePeriod,
            periods,
            getEventList,
            numberOfPeriods,
            getActivePeriodItem,
        }

    }, [activePeriod, periods]);
    return (
        <TimeIntervalsContext.Provider value={contextValue}>
            <div className="time-intervals">
                {children}
            </div>
        </TimeIntervalsContext.Provider>
    )
}

export default TimeIntervalsProvider;