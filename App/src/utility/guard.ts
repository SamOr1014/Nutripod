import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { IRootState } from "../redux/store"
import { useSelector } from "react-redux";


export function isUserLoggedIn() {
    
    const navigate = useNavigate();
    const isLoggedInByUser = useSelector((state:IRootState) => state.user.user[0].is_user)
    const isLocalToken = window.localStorage.getItem('userLocalToken')
    const isSessionToken = sessionStorage.getItem("userSessionToken")

    if (!isLoggedInByUser) {
        navigate("/login") 
    }
}