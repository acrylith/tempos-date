import { useState } from "react";

export default function App() {
  const [ day, setDay ] = useState(0);
  const [ month, setMonth ] = useState(0);
  const [ year, setYear ] = useState(0);
  const [ dayOfWeek, setDayOfWeek ] = useState();

  const weekDay = () => {
    let daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    let nDay = 28 * 12 * year;
    // console.log(`В році 12 місяців по 28 днів => ${nDay}`);
    if(year % 5 === 0) {
      nDay += year / 5;
      // console.log(`В кожному п'ятому +1 день => ${nDay}`);
    }
    if(year % 100 === 0) {
      nDay -= year / 100;
      // console.log(`Мінус кратні 100 але не 500 => ${nDay}`);
    }
    if(year % 500 === 0) {
      nDay += year / 500;
      // console.log(`кратні 500 => ${nDay}`);
    }
    nDay += (month - 1) * 28;
    // console.log(`Плюс місяць => ${nDay}`);
    nDay += day
    // console.log(`Плюс день => ${nDay}`);
    if((year % 5 === 0 && year % 100 !== 0) ||
      (year % 500 === 0 && month >= 3)) {
        nDay++
        // console.log(`Плюс один день, якщо минув лютий => ${nDay}`);
    }
    setDayOfWeek(daysOfWeek[(nDay % 7)])
  }

  return (
    <div className="App">
      <h1>Дата на Темпосі</h1>
      <div className="form">
        <input
          type="text"
          className={Number.isInteger(day) ? null : "wrong"}
          onChange={(e) => setDay(Number(e.target.value))}
        />
        <input
          type="text"
          className={Number.isInteger(month) ? null : "wrong"}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
        <input
          type="text"
          className={Number.isInteger(year) ? null : "wrong"}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>
      <div className="result">
        {dayOfWeek ? 
          <p>Сьогодні на Темпосі {dayOfWeek}</p>:
          null
        }
      </div>
      <div className="btn-wrapper">
      <button
        onClick={weekDay}
        disabled={(Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(year))&&
          (day !== 0 && month !== 0)? false : true}
      >
          Обрахувати
      </button>
      </div>
      
    </div>
  );
}