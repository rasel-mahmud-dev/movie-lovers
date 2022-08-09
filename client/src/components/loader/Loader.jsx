import React from 'react';

import "./style.css"


// interface LoaderProps{
//   isLoading?: boolean,
//   className?: "big_loader" | "small_loader",
//   attributes?: any
// }

const Loader = (props) => {
  const { isLoading, className, ...attributes} = props
  
  return (
    <div className={className+" loader_root"} {...attributes}>
      <span/>
      <span/>
      <span/>
      <span/>
    </div>
  );
};

export default Loader;