import React from 'react';
import "./styles/index.scss";
import TimeIntervals from "./components/time-intervals/TimeIntervals";



const App = () => {
    return (
        <div className={"app"}>
            <TimeIntervals/>
        </div>
    );
};

export default App;