import React from "react";
import { Bell, Globe2, LockKeyhole, Moon, Sun } from 'lucide-react'; 
import { useState } from 'react'; 
import DashboardLayout from '../components/DashboardLayout'; 
import { useTheme } from '../context/ThemeContext';
export default function Settings()
{
    const {dark,setDark}=useTheme();
    const [notifications,setNotifications]=useState(true),
    [privacy,setPrivacy]=useState(true),
    [lang,setLang]=useState('English');
    return <DashboardLayout title="Settings" subtitle="Tailor VidyaVerse to the way you work.">
        <div className="settings-list">
            <Setting icon={dark?<Moon/>:<Sun/>} title="Appearance" text="Switch between light and dark mode.">
            <Toggle value={dark} onChange={setDark}/>
            </Setting>
            <Setting icon={<Bell/>} title="Booking notifications" text="Get updates for confirmations and changes.">
            <Toggle value={notifications} onChange={setNotifications}/>
            </Setting>
            <Setting icon={<LockKeyhole/>} title="Privacy" text="Keep your booking information private.">
            <Toggle value={privacy} onChange={setPrivacy}/>
            </Setting>
            <Setting icon={<Globe2/>} title="Language" text="Choose your preferred app language.">
            <select value={lang} onChange={e=>setLang(e.target.value)}>
                <option>English</option>
                <option>Marathi</option>
                <option>Hindi</option>
                </select>
                </Setting>
                </div>
                </DashboardLayout>
}
function Setting({icon,title,text,children})
{
    return <article><span>{icon}</span>
    <div>
        <h3>{title}</h3>
        <p>{text}</p>
        </div>
        {children}
        </article>
}
function Toggle({value,onChange})
{
    return <button onClick={()=>onChange(!value)} className={`toggle ${value?'on':''}`}>
        <i/>
        </button>
        }
