import {useEffect, useRef, useState} from "react";

interface AnimatedYearProps {
    className?: string;
    animatedYear: number;
    duration: number;
}

export const AnimatedYear = ({animatedYear, duration, className}: AnimatedYearProps) => {
    const yearRef = useRef<HTMLSpanElement>(null);
    const [year, setYear] = useState(animatedYear);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const animate = async (ref:HTMLSpanElement) => {
        if (year === animatedYear){
            return
        }
        const delta = animatedYear - year;
        const frameDuration = Math.abs(delta) / duration;

        if (delta > 0) {
            for (let i = year; i <= animatedYear; i++ ) {
                ref.innerHTML = i.toString();
                await sleep(frameDuration);
            }
        } else {
            for (let i = year; i >= animatedYear; i-- ) {
                ref.innerHTML = i.toString();
                await sleep(frameDuration);
            }
        }
    }

    useEffect(() => {
        if (!yearRef.current) {
            return
        }
        animate(yearRef.current);
        setYear(animatedYear);
    }, [animatedYear,yearRef]);
    return (
        <span className={className} ref={yearRef}>{year}</span>
    );
};