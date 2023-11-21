import React, {useEffect, useState} from "react";
import "../index.css"
import TimeCheckboxes from "./TimeCheckboxes";
const Calendar =()=>{

    const currentDate = new Date();
    const [currentWeek, setCurrentWeek] = useState(currentDate);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedTimezone, setSelectedTimezone] = useState('UTC');


    const getStartOfWeek = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(date.getDate() - date.getDay());
        return startOfWeek;
    };

    const startOfWeek = getStartOfWeek(currentWeek);

    const dates = [...Array(7)].map((_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + index);
        return day.getDate();
    });



    const handlePrevWeek = () => {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
    };

    const handleNextWeek = () => {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));
    };

    const handleTimezoneChange = (e) => {
        setSelectedTimezone(e.target.value);
    };


    return(
        <>

            <div className="calendar-container">

                <div className="timezone-select">
                    <label htmlFor="timezone">Select Timezone: </label>
                    <select id="timezone" onChange={handleTimezoneChange} value={selectedTimezone}>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York</option>
                    </select>
                </div>


                <div className="month-year">
                    {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentWeek)}
                </div>

                <div className="navigation">
                    <button onClick={handlePrevWeek}>Previous Week</button>
                    <button onClick={handleNextWeek}>Next Week</button>
                </div>
                <div className="weekdays">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                        <div key={day} className="day-container">
                            <div className="day-date">
                                <div className="day-name">{day}</div>
                                <div className="date">{dates[index + 1]}</div>
                            </div>
                            <div>
                               <TimeCheckboxes day={day}/>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Calendar;