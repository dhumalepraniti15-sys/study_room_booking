import { BookOpen } from 'lucide-react'; import { Link } from 'react-router-dom';
export default function Brand({ dark=false }){return <Link to="/" className={`brand ${dark?'brand-dark':''}`}><span><BookOpen/></span><b>Vidya<span>Verse</span></b></Link>}
