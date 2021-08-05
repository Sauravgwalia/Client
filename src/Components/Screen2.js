import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import './Screen2.css'
import Signup from './signup';
import Tab2 from './Tab2';
import axios from 'axios';
const Screen2 = () => {

  const [ index , setIndex ] = useState(0)
    
      const handleChange = (event, value) => {
        setIndex(value)
      };
    
      const handleChangeIndex = index => {
        setIndex(index)
      };

      useEffect( () => {
        const token = localStorage.getItem('token')
        if(token && token.length >= 5){
        axios.post('https://authenticateassign.herokuapp.com/auth/verify' , {
            token : token })
        .then ( res => {
            console.log(res.data)
         
        })
 
        .catch( err => {
            console.log(err)
        })
     }
     else{
         console.log('no token')
         window.location.assign('/')
     }
      } , [])

  
    return ( 
        <div className="screen2">
                   <div className="tabs" value={index} fullWidth onChange={handleChange} >
          <div onClick={ () => setIndex(0)}  className="tab-list" > 1 </div>
          <div onClick={ () => setIndex(1)} className="tab-list" > 2 </div>
    
 
        </div>
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div className="slide"> <Signup></Signup></div>
          <div className="slide">
            <Tab2></Tab2>
          </div>
        </SwipeableViews>
        </div>
     );
}
 
export default Screen2;