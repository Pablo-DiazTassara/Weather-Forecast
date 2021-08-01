import React, { useEffect }  from "react";
import './spinner.css';
import { useDispatch } from 'react-redux';
import { loadingAction } from "../../redux/spinnerDuck";

export function Spinner(){

  const dispatch = useDispatch();

    useEffect(() => {

      setTimeout(function () { 
        console.log('loading -- false');
        dispatch(loadingAction(false));
      }, 
      5000);    

    },
      [dispatch]
    ); 

  
    return (
      <div id="faceoff">
        <div id="preloader"></div>
        <div className="preloader-section"></div>
      </div>
    );
    
  }
