import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import DropdownMenu from "./DropdownMenu";

export default function () {
  const {currentUser} = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isDropdownOpen &&
        event.target.closest(".dropdown-menu") === null &&
        event.target.closest("button") === null
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);



  return (
    <div className="bg-slate-100">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold ">GYm</h1>
        </Link>
        
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link><Link to="/">
            <li>Contact</li>
          </Link>
          <Link to="/">
            <li>Vist Store</li>
          </Link>
          <Link to="/">
            <li>Trainers</li>
          </Link>
          <Link to="/">
            <li>Package</li>
          </Link>
          {isDropdownOpen && (
                     <DropdownMenu
                       isOpen={isDropdownOpen}
                       toggleDropdown={toggleDropdown}
   
   
                     />
                     )}
          
         

            {currentUser ? (
              <>
              <button onClick={toggleDropdown}>
               <li>Icon</li>
             </button>
               <Link to={'/dashboard?tab=profile'}>
               <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
               </Link>

               
             </>
            
           
            
               )
           
            :(
              <Link to="/sign-in" >
              <li>Sing In</li>
              </Link>
            )}
            
        
        </ul>
      </div>
    </div>
  );
}