import axios from 'axios';
import { useEffect } from 'react';
import './Homepage.css'
import Login from './login';
const Homepage = () => {

    return ( 
        <div className="homepage">
            <Login></Login>
        </div>
     );
}
 
export default Homepage;