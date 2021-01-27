import React from 'react'
import "./Header.scss"

const Header = (props) => {
    return ( 
        <header>
            Drinks' Searcher
            <form onSubmit={(e)=> props.submit(e)}>
                 <input placeholder="Type a drink" value={props.search} onChange={(e)=> props.changeInput(e)}/>
                 <select onChange={(e)=> props.changeType(e)}>
                     <option value="s">Search by drink name</option>
                     <option value="i">Search by ingredient</option>
                 </select>
                 <input type="submit" value="search" className="header-btn"/>
            </form>
            <input type="button" className="header-btn" value="SURPRISE ME" onClick={props.surpriseme}/>
           
        </header>
     );
}
 
export default Header;