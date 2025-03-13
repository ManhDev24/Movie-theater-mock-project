import React from "react";

const LoadingStartup = () =>{
    return(
        <div className="flex justify-center place-items-center min-h-screen bg-black">
            <img
                src="../src/app/assets/img/logo-theater.png"
                alt="Loading..."
                className="w-100 h-100 animate-pulse   "
            />
            <br/>
        </div>
    )
};

export default LoadingStartup;