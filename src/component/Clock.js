import React from "react";
import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
import day from "../component/Images/day.jpg";
import night from "../component/Images/night.jpg";
import eve from "../component/Images/evening.jpg";

function Clock() {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMiniutes] = useState("");
  const [location, setLocation] = useState("");
  const [time_zone, setTime_zone] = useState("");
  const [greetings, setGreetings] = useState("");
  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState(" ");
  const [quotes, setQuotes] = useState(
    "When the going gets tough, the tough get going"
  );
  const [speaker, setSpeaker] = useState("Joe Kennedy");

  const getRandomQuotes = () => {
    document.getElementById("rel").classList.add("reload");
    setTimeout(function () {
      var x = document.getElementById("rel");
      x.classList.remove("reload");
    }, 10);

    var quotesArr = [
      "When the going gets tough, the tough get going",
      "Opportunities don’t happen, you create them.",
      "Don’t wait for your feelings to change to take the action. Take the action and your feelings will change.",
    ];
    var speaker = ["Joe Kennedy", "Chris Grosser", "Barbara Baron"];

    var thoughts = new Map();

    for (let i = 0; i < speaker.length; i++) {
      thoughts.set(quotesArr[i], speaker[i]);
    }
    console.log(thoughts);
    let x = Math.floor(Math.random() * quotesArr.length);
    let n = quotesArr[x];
    console.log(x);
    setQuotes(n);
    let q = speaker[x];
    setSpeaker(q);
  };

  setInterval(function () {
    var t = new Date();
    var h = t.getHours();
    var m = t.getMinutes();
    // var s = t.getSeconds();
    // setSec(s);
    if (h < 10) {
      setHour("0" + h);
    } else {
      setHour(h);
    }

    if (m < 10) {
      setMiniutes("0" + m);
    } else {
      setMiniutes(m);
    }

    if (h >= 3 && h < 12) {
      setGreetings("GOOD MORNING");
      setIcon(<BiSun />);
      setBackground(day);
    } else if (h >= 12 && h < 16) {
      setGreetings("GOOD AFTERNOON");
      setIcon(<BiSun />);
      setBackground(day);
    } else if (h >= 16 && h <= 19) {
      setGreetings("GOOD EVENING");
      setIcon(<BiMoon />);
      setBackground(eve);
    } else {
      setGreetings("GOOD EVENING");
      setIcon(<BiMoon />);
      setBackground(night);
    }
  }, 1000);

  window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successfulLookup, failure);
    } else {
      alert("Location not obtained");
    }
  };
  const successfulLookup = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f3bbc576c3214ab584cc99f9922af93e`
    )
      .then((response) => response.json())
      .then((data) => showLocation(data));
  };
  const failure = () => {
    alert("Accesss denied");
  };

  const showLocation = (data) => {
    console.log(
      data.results[0].annotations.timezone.name,
      data.results[0].annotations.timezone.short_name
    );

    setLocation(data.results[0].annotations.timezone.name);
    setTime_zone(data.results[0].annotations.timezone.short_name);
    var month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sept", "Oct", "Nov", "Dec"];
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    console.log(d.getFullYear());
    console.log(d.getMonth() + 1);
    console.log(d.getDate());
    if (date < 10) {
      date = "0" + date;
    }
    // if (month < 10) {
    //   month = "0" + month;
    // }
    setDate(date + " " + month_list[month - 1] + "," + year);
  };

  return (
    <div className="clock" style={{ backgroundImage: `url(${background})` }}>
      <div className="details_container">
        <h2>
          <span className="icon">{icon}</span> {greetings}, IT'S CURRENTLY NOW
        </h2>
        <div className="wrap">
          <span className="time_details">
            {hour}:{minutes}
          </span>
          <h1>{time_zone}</h1>
        </div>
        <span className="loc"> IN {location},</span>
        <br />
        <span className="loc">{date}</span>
      </div>
      <div className="quote">
        <div>
          <big>
            <b>
              <q>
                <i> {quotes} </i>
              </q>
            </b>
          </big>
          <br />
          <h2>{speaker}</h2>
        </div>

        <span className="sl">
          <AiOutlineReload
            id="rel"
            className="reload"
            onClick={getRandomQuotes}
          />
        </span>
      </div>
    </div>
  );
}

export default Clock;
