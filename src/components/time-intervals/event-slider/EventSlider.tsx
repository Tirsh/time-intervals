import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import TimeIntervalsContext from "../context/TimeIntervalsContext";
import {Swiper, SwiperSlide} from 'swiper/react';
import IntervalEvent from "../interval-event/IntervalEvent";
import {LeftNavigationArrow} from "../../icons/LeftNavigationArrow";
import {RightNavigationArrow} from "../../icons/RightNavigationArrow";

import "./eventSlider.scss";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Pagination} from "swiper/modules";

const EventSlider = () => {
    const {getEventList, activePeriod} = useContext(TimeIntervalsContext);
    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const sliderRef = useRef(null);

    useEffect(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.update();

    }, [activePeriod]);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const handleChange = useCallback((swiper: any) => {
        setIsEnd(false);
        setIsStart(false);
        if (swiper.isBeginning) {
            setIsStart(true);
        }
        if (swiper.isEnd) {
            setIsEnd(true);
        }

    }, [isStart, isEnd])

    const eventList = useMemo(() => {
        return getEventList().map((item, i) => (
            <SwiperSlide key={i}>
                <IntervalEvent year={item.year} description={item.description}/>
            </SwiperSlide>))
    }, [activePeriod]);

    return (
        <div>
            <Swiper
                ref={sliderRef}
                spaceBetween={80}
                modules={[Pagination]}
                slidesPerView={1}
                onUpdate={handleChange}
                onActiveIndexChange={handleChange}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.5,
                        navigation: false,
                    },
                    480: {
                        slidesPerView: 1.5,
                        navigation: false,
                    },
                    620: {
                        slidesPerView: 2,
                        navigation: false,
                    },
                    960: {
                        slidesPerView: 3,
                    }
                }}
            >
                {eventList}
            </Swiper>
            <button onClick={handlePrev}
                    className={["event-slider__button", "event-slider__button_left", isStart ? "event-slider__button_disabled" : null].join(" ")}>
                <LeftNavigationArrow/></button>
            <button onClick={handleNext}
                    className={["event-slider__button", "event-slider__button_right", isEnd ? "event-slider__button_disabled" : null].join(" ")}>
                <RightNavigationArrow/></button>
        </div>
    )
}

export default EventSlider;