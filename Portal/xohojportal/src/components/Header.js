import React from "react";

const Header = ( { handleToggleDarkMode } ) => {
    return(
     <div className="header">
        <h1>Notes</h1>
        <buttom onClick={()=> handleToggleDarkMode( 
            (previousDarkMode) => !previousDarkMode
           )
        } 
        className="save">Toggle Mode</buttom>
     </div>
    );
};


export default Header;