"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus, setUser } from "../../store/slices/authSlice";
import { useState } from "react";
import configuration from "../../constants/configuration";
import route from "../../constants/route";
import Cookies from "js-cookie";
import ScreenSets from "./ScreenSets";
import { getJWTToken, getProfileInformation, loginRegister } from "../../lib/GigyaRaas";
import { getAuthToken } from "../../lib/methods";
import { selectHeaderLabel } from "../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../lib/Common";
import Link from "next/link";

export default function LoginSignUp({ hideScreenSet = false, hideDesktopBtn = false }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParam = useSearchParams();
    const referer = searchParam.get('referer')
    const headerData = useSelector(selectHeaderLabel)
    const headerNavData = headerData.header_nav ? headerData.header_nav : {}
    const [showScreenSet, setShoScreenSet] = useState(hideScreenSet)

    const handleSignIn = (isNew) => {
        loginRegister({
            isNew,
            callback: async (result) => {
                if (result.profile !== null) {
                    getJWTToken(async (res) => {
                        if (res.errorCode === 0) {
                            const authResponse = await getAuthToken({
                                UID: result.UID,
                                UIDSignature: result.UIDSignature,
                                timeStamp: result.signatureTimestamp,
                                idToken: res.id_token,
                            })
                            if (authResponse.status === 200 && authResponse.response && authResponse.response?.access_token) {
                                localStorage.setItem(configuration.hybrisTokenCookieName, authResponse.response.access_token)
                                Cookies.set(configuration.userEmailCookie, result.profile.email, { sameSite: true })

                                getProfileInformation((response) => {
                                    dispatch(setAuthStatus(true))
                                    dispatch(setUser({
                                        ...response,
                                        requestParams: undefined
                                    }))
                                    if (referer) {
                                        router.push(referer)
                                    }
                                })
                            }
                        }
                    })
                }
            },
            onAfterSubmit: async (result) => {
                if (result.screen === "gigya-forgot-password-screen" && result.response.errorCode === 0) {
                    return {
                        nextScreen: 'gigya-success-reset-password-screen'
                    };
                }
            },
            onError: function (err) {
                console.log('err', err)
            }
        })

    }


    return (
        <>
            {hideDesktopBtn &&
                <Link href="/" className="user-icon" onClick={(e) => {
                    e.preventDefault();
                    handleSignIn(false);
                }}></Link>
            }
            {!hideDesktopBtn &&
                <div className="login p-xs">
                    <i className="user-icon"></i>
                    <button type="button" onClick={() => handleSignIn(false)}>{getSpecificLabel(headerNavData, 'sign_in', 'Sign in')}</button>
                    <span className="separator">|</span>
                    <button type="button" onClick={() => handleSignIn(true)}>{getSpecificLabel(headerNavData, 'join_now', 'Join')}</button>
                </div>
            }
            {showScreenSet &&
                <div className="gigya-screen-set hidden" id="simple-screen-set" data-on-pending-registration-screen="edit-profile">
                    <ScreenSets />
                </div>
            }
        </>
    );
}