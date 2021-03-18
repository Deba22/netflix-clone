import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './Nav.css'
import profileIcon from '../icons/profile.svg';

function Nav() {

    const [show, handleShow] = useState(false);
    const history = useHistory();
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        }
        else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img onClick={() => history.push('/')}  className="nav__logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                <img  onClick={() => history.push('/profile')} className="nav__avatar" src={profileIcon} alt="" />
            </div>
        </div>
    )
}

export default Nav
