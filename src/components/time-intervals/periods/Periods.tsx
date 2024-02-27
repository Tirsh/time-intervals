import {FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import "./period.scss";
import {LeftArrow} from "../../icons/LeftArrow";
import {RightArrow} from "../../icons/RightArrow";
import {AnimatedYear} from "./AnimatedYear";
import TimeIntervalsContext from "../context/TimeIntervalsContext";

type Point = {
    x: number,
    y: number,
    num: number;
}

const Periods: FC = () => {
    const {activePeriod, setActivePeriod, numberOfPeriods, getActivePeriodItem} = useContext(TimeIntervalsContext);
    const [points, setPoints] = useState<Point[]>([]);
    const [rotation, setRotation] = useState(0);
    const ellipseRef = useRef<HTMLDivElement>(null);
    const rightButtonRef = useRef<HTMLButtonElement>(null);
    const leftButtonRef = useRef<HTMLButtonElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    const onePeriodDegree = useMemo(() => 360 / numberOfPeriods, [numberOfPeriods]);

    useEffect(() => {
        if (!ellipseRef.current) {
            return
        }
        const rect = ellipseRef.current.getBoundingClientRect();
        const ellipseWidth = rect.width;
        const ellipseHeight = rect.height;
        const radius = (ellipseWidth / 2);
        const points: Point[] = []
        const periodInRad = Math.PI * 2 / numberOfPeriods;
        let period = 1;
        for (let i = -1; i < (Math.PI * 2 - 1.5); i += periodInRad) {
            const x = ellipseWidth / 2 + radius * Math.sin(i);
            const y = ellipseHeight / 2 + radius * Math.cos(i);
            points.push({x, y, num: period++});
        }
        setPoints([...points]);
    }, [ellipseRef, numberOfPeriods]);

    useEffect(() => {
        if (!ellipseRef.current) {
            return
        }
        ellipseRef.current.style.transform = `rotate(${rotation}deg)`;
    }, [rotation]);

    useEffect(() => {
        if (!leftButtonRef.current || !rightButtonRef.current) {
            return;
        }
        titleRef.current.classList.add("period__title_delay");
        setTimeout(() => {
            titleRef.current.classList.remove("period__title_delay");
        }, 500);
        leftButtonRef.current.disabled = false;
        rightButtonRef.current.disabled = false;
        if (activePeriod === 1) {
            leftButtonRef.current.disabled = true;
        } else if (activePeriod === numberOfPeriods) {
            rightButtonRef.current.disabled = true;
        }

    }, [activePeriod, leftButtonRef, rightButtonRef])

    const rotationHandler = useCallback((direction: "left" | "right") => {
        if (direction === "left") {
            setActivePeriod(activePeriod < numberOfPeriods ? activePeriod + 1 : 1);
        } else {
            setActivePeriod(activePeriod > 1 ? activePeriod - 1 : numberOfPeriods);
        }
        setRotation(state => (direction === "right") ? state + onePeriodDegree : state - onePeriodDegree);
    }, [rotation]);

    const periodChooseHandler = useCallback((period: number) => {
        setRotation(-(period - 1) * onePeriodDegree);
        setActivePeriod(period);
    }, [])

    const renderPoints = useMemo(() => {
        return points.map((point, i) => {
            return (
                <div onClick={() => periodChooseHandler(point.num)} key={i}
                     className={["period__point", point.num === activePeriod ? "period__point_active" : null].join(" ")}
                     style={{
                         top: `${point.x}px`,
                         left: `${point.y}px`,
                         transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
                     }}>
                    {point.num}
                </div>
            )
        })
    }, [points, rotation, activePeriod]);

    const {title, yearFrom, yearTo} = useMemo(() => {
        return {
            title: getActivePeriodItem().title,
            yearFrom: getActivePeriodItem().yearStart,
            yearTo: getActivePeriodItem().yearEnd
        }
    }, [activePeriod]);

    return (
        <div className="period">
            <div className="period__container">
                <div ref={ellipseRef} className="period__ellipse">
                    {renderPoints}
                </div>
                <div ref={titleRef} className="period__title">{title}</div>
            </div>
            <div className="period__years">
                <AnimatedYear className="period__years_from" animatedYear={yearFrom} duration={1000}/>
                <AnimatedYear className="period__years_to" animatedYear={yearTo} duration={1000}/>
            </div>
            <div className="period__controls">
                <div className="period__counter">
                    <p>{activePeriod}/{numberOfPeriods}</p>
                </div>
                <div className="period__buttons">
                    <button ref={leftButtonRef} className="period__button" onClick={() => rotationHandler("right")}>
                        <LeftArrow/></button>
                    <button ref={rightButtonRef} className="period__button" onClick={() => rotationHandler("left")}>
                        <RightArrow/></button>
                </div>
            </div>

        </div>
    )
}

export default Periods;