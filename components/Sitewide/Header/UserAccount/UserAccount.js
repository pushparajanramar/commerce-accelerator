//***** Search box *****//
// Description: Site search box for navigation component (used in Header)
// Usage: Main navigation menu
//****************//
"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuthModal } from "../../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../../lib/Common";
import { logoutWithRaaS } from "../../../../lib/GigyaRaas";
import Cookies from "js-cookie";
import { setAuthStatus, setUser } from "../../../../store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import configuration from "../../../../constants/configuration";

const UserAccount = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const userModalData = useSelector(selectUserAuthModal)
  const headerNavData = userModalData.private ? userModalData.private : {}
  const userGreetingData = getSpecificLabel(headerNavData, 'user_greeting')
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOff = () => {
    logoutWithRaaS((response) => {
      if (response.status === "OK") {
        Cookies.remove(configuration.userEmailCookie)
        Cookies.remove(configuration.hybrisTokenCookieName)

        dispatch(setAuthStatus(false))
        dispatch(setUser({}))

        if (pathname.startsWith('/my-account/')) {
          return router.push('/?referer=' + encodeURI(pathname))
        }
      }
    })
  }

  return (
    <>
      <div className="user">
        <p className="p-xs">
          <i className="user-icon"></i>
          <span className="name">{userGreetingData.replaceAll(/{firstName}/gi, authState.user?.profile.firstName)}</span>
          {/* <button type="button" className="tm-button text-link" onClick={handleSignOff}>{getSpecificLabel(headerNavData, 'logout_button_label')}</button> */}
        </p>
      </div >
    </>
  )
};

export default UserAccount;
