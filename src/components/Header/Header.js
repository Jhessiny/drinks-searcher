import React from 'react'
import "./Header.scss"

const Header = () => {
    return ( 
        <header>
            Header
            <form>
                 <input placeholder="Type a drink"/>
                 <select>
                     <option>Search by drink name</option>
                     <option>Search by ingredient</option>
                 </select>
                 <input type="submit" value="search"/>
            </form>
            <input type="button" value="surprise-me"/>
           
        </header>
     );
}
 
export default Header;