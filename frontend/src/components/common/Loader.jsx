import React from "react";

export const Loader = ({ message = "Loading..." }) => {
    return <div className="loader-spinner">{message}</div>;
};

export default Loader;
