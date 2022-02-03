import { useState } from "react";

export default function App() {
  const [ day, setDay ] = useState(0);
  const [ month, setMonth ] = useState(0);
  const [ year, setYear ] = useState(0);
  const [ dayOfWeek, setDayOfWeek ] = useState();

  const weekDay = () => {
    let daysOfWeek = ["Четвер", "П'ятниця", "Субота", "Неділя", "Понеділок", "Вівторок", "Середа"];
    let nDay = 28 * 12 * (year - 1);
    // console.log(`В році 12 місяців по 28 днів => ${nDay}`);
    nDay = nDay + Math.floor(year / 5 - year / 100 + year / 500);
    // console.log(`Додаткові дні з високосних років => ${nDay}`);
    nDay = nDay + ((month - 1) * 28);
    // console.log(`Плюс місяць => ${nDay}`);
    nDay = nDay + day;
    // console.log(`Плюс день => ${nDay}`);
    if((year % 5 === 0 && year % 100 !== 0 && month > 2) ||
      (year % 500 && month > 2)) {
        nDay++
        // console.log(`Плюс один день, якщо минув лютий => ${nDay}`);
    }
    console.log(nDay, (nDay % 7))
    setDayOfWeek(daysOfWeek[(nDay % 7)]);
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
          (day !== 0 && month !== 0 && year !== 0)? false : true}
      >
          Обрахувати
      </button>
      </div>
      
    </div>
  );
}