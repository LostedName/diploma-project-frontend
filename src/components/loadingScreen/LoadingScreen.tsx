import React from "react";
import './loadingScreen.scss';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen-container">
        <div className="loading-screen-bg">
        </div>
        <div className="loading-crow">
          <img src="/assets/crow.gif" alt="loader"/>
        </div> 
    </div>
  ); 
}

export default LoadingScreen;