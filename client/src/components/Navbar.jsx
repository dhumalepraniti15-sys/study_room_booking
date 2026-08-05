import { Link, NavLink } from 'react-router-dom'; 
import Brand from './Brand'; 
import { Menu, X } from 'lucide-react'; 
import { useState } from 'react'; 
import { useAuth } from '../context/AuthContext';
export default function Navbar()
{
    const [open,setOpen]=useState(false);
    const {user}=useAuth(); 
    const close=()=>setOpen(false);
    return <header className="navbar">
        <Brand/>
        <button className="menu-btn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}
        </button>
        <nav className={open?'nav-open':''}>
            <NavLink to="/" onClick={close}>Home
            </NavLink>
            <NavLink to="/rooms" onClick={close}>Rooms
            </NavLink>
            <NavLink to="/about" onClick={close}>About
            </NavLink>
            <NavLink to="/contact" onClick={close}>Contact
            </NavLink>
            </nav>
            <div className="nav-actions">{user?
                <Link to="/dashboard" className="button button-primary">Dashboard
                </Link>:<>
                <Link to="/login" className="button button-ghost">Login</Link><Link to="/register" className="button button-primary">Register</Link></>}</div></header>}
