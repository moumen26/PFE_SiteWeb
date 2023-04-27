import { React } from "react";
import { generateDate, months } from "../util/Calendar";
import check from "../util/cn";
import dayjs from "dayjs";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function MyDashboradCalendar() {
  console.log(generateDate());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectdate] = useState(currentDate);

  return (
    <div className="dashboard-calendar-container">
      <div className="calendar-dashboard-header">
        <h2>Calendar</h2>
      </div>
      <div className="w-96 h-96">
        <div className="flex justify-between">
          <h1 className="font-semibold">
            {months[today.month()]} {today.year()}
          </h1>
          <div className="flex items-center gap-5">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />

            <GrFormNext
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="dashboard-calendar-lh"></div>
        <div className="w-full grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1 key={index} className="h-14 grid place-content-center">
                {day}
              </h1>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div key={index} className="h-14 grid place-content-center">
                  <h1
                    className={check(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-cyan-300" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-cyan-300 text-white"
                        : "",
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-cyan-100 hover:text-cyan-900 transition-all cursor-pointer"
                    )}
                    onClick={() => {
                      setSelectdate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="dashboard-calendar-bottom">
        <div className="upcomping">
          <h2>Upcoming</h2>
          <a href="#">view all</a>
        </div>
        <div className="dashboard-calendar-doctor-meet">
          <div className="monthly-doctor">
            <span>M</span>
          </div>
          <div className="monthly-meet">
            <a href="#">Monthly doctor's appointment</a>
            <h3>
              <span>{selectDate.toDate().toDateString()}</span> |{" "}
              <span>08:00 AM</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
