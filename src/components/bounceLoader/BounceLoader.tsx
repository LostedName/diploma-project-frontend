import React from "react";
import "./bounceLoader.scss";

const BounceLoader: React.FC = () => {
  return (
    <div className="bouncer_loader_component">
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
    </div>
  );
}

export default BounceLoader;