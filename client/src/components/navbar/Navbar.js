import React,{ useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {

    useEffect(()=>{
        let toggle = document.getElementsByClassName("MenuButton")[0];
        let navbarContents = document.getElementsByClassName("NavbarContents")[0];
        let navHeader = document.getElementsByClassName("NavHeader")[0];
        let navElements = document.querySelectorAll("a");

        toggle.addEventListener("click",() => {
            navbarContents.classList.toggle("active");
            navHeader.classList.toggle("active");
            toggle.classList.toggle("active");
            for(var i=0;i<navElements.length;i++){
                navElements[i].classList.toggle("active");
            }
        })
        
    })

    return (
        <div className="NavHeader">
            {/* <div className="NavLinks">  */}
            <div id="DynamicDiv1">
                <div id="DynamicDiv2"></div>

                <div className="MenuButton">
                    <p>Menu</p>
                </div>
            </div>
                <div className="NavbarContents">
                    <p className="NavElements"><a href="#">About</a></p>
                    <p className="NavElements"><a href="#">Workshops</a></p>
                    <p className="NavElements"><a href="#">Programs</a></p>
                    <p className="NavElements"><a href="#">Community</a></p>
                    <p className="NavElements"><a href="#">Login</a></p>
                </div>
                <div>
                    <div className="MentorButton">
                        <p style={{margin:"auto"}}>Apply Mentor</p>
                    </div>
                </div>
            {/* </div>  */}
        </div>
    )
}
