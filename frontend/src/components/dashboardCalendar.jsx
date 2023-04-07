import { React } from "react";
import { Calendar } from "antd";

export default function MyDashboradCalendar() {

  return (
      <Calendar onSelect={() => {
        return <h5>rendez-vous</h5>
      }} 
      dateCellRender={(date)=>{
        if(new Date(date).getDate() === new Date().getDate()){
          return <h5>rendez-vous</h5>
        }
      }}/>
  );
}
