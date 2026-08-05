import React, { useState } from "react";
import {
  Bell,
  Globe2,
  LockKeyhole,
  Moon,
  Sun
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import "./AdminSettings.css";


export default function Settings() {


  const { dark, setDark } = useTheme();


  const [notifications,setNotifications] = useState(true);
  const [privacy,setPrivacy] = useState(true);
  const [lang,setLang] = useState("English");



  return (

    <div className="settings-page">


      <div className="settings-header">

        <h1>Settings</h1>

        <p>
          Manage your application preferences and account settings
        </p>

      </div>




      <div className="settings-card">


        <Setting
          icon={dark ? <Moon/> : <Sun/>}
          title="Appearance"
          text="Switch between light and dark mode."
        >

          <Toggle
            value={dark}
            onChange={setDark}
          />

        </Setting>





        <Setting
          icon={<Bell/>}
          title="Booking Notifications"
          text="Get updates for confirmations and changes."
        >

          <Toggle
            value={notifications}
            onChange={setNotifications}
          />

        </Setting>





        <Setting
          icon={<LockKeyhole/>}
          title="Privacy"
          text="Keep your booking information private."
        >

          <Toggle
            value={privacy}
            onChange={setPrivacy}
          />

        </Setting>





        <Setting
          icon={<Globe2/>}
          title="Language"
          text="Choose your preferred app language."
        >

          <select
            value={lang}
            onChange={(e)=>setLang(e.target.value)}
          >

            <option>English</option>
            <option>Marathi</option>
            <option>Hindi</option>

          </select>


        </Setting>



      </div>


    </div>

  );

}




function Setting({icon,title,text,children}){


  return (

    <div className="setting-row">


      <div className="setting-icon">
        {icon}
      </div>



      <div className="setting-info">

        <h3>{title}</h3>

        <p>{text}</p>

      </div>



      <div className="setting-action">

        {children}

      </div>



    </div>

  );


}





function Toggle({value,onChange}){


  return (

    <button
      className={`toggle ${value ? "on" : ""}`}
      onClick={()=>onChange(!value)}
    >

      <i></i>

    </button>

  );


}