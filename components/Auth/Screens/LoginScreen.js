"use client"
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUserAuthModal } from '../../../store/slices/labelsSlice';
import { getSpecificLabel } from '../../../lib/Common';
import parse from "html-react-parser";
import Image from 'next/image';

function LoginScreen(props) {
    const userModalData = useSelector(selectUserAuthModal)
    const sharedData = userModalData.shared ? userModalData.shared : {}
    const signInData = userModalData.sign_in ? userModalData.sign_in : {}
    const headerImgData = getSpecificLabel(sharedData, 'brand_logo')
    return (
        <form className="gigya-login-form">
            <div>
                <div>
                    {headerImgData && headerImgData.url &&
                        <Image
                            loader={() => headerImgData.url}
                            unoptimized
                            src={headerImgData.url}
                            width={30}
                            height={30}
                            alt={headerImgData?.title}
                        />
                    }
                    <p>{getSpecificLabel(sharedData, 'rewards_label')}</p>
                </div>
                <div>
                    <h2>{getSpecificLabel(signInData, 'welcome')}</h2>
                    {parse(getSpecificLabel(signInData, 'message'))}
                </div>
                <div>
                    {getSpecificLabel(signInData, 'need_an_account')}
                    <button type="button" data-switch-screen="gigya-register-screen">{getSpecificLabel(signInData, 'sign_up_toggle_label')}</button>
                </div>
                <h2>{getSpecificLabel(signInData, 'sign_in_form_label')}</h2>
                <div >
                    <input
                        name="loginID"
                        aria-label={getSpecificLabel(sharedData, 'email')}
                        aria-required="true"
                        type="text"
                        placeholder={getSpecificLabel(sharedData, 'email')}
                        className="form-control"
                    />
                    <div className=" gigya-error-msg" data-bound-to="loginID"></div>
                </div>
                <div>
                    <input
                        name="password"
                        aria-label={getSpecificLabel(sharedData, 'password')}
                        placeholder='Password'
                        aria-required="true"
                        type={getSpecificLabel(sharedData, 'password')}
                        className="form-control"
                    />
                    <div className="gigya-error-msg" data-bound-to="password"></div>
                </div>
                <div className="gigya-captcha"></div>

                <div className="gigya-error-display" data-bound-to="gigya-login-form" aria-atomic="true">
                    <div className="gigya-error-msg gigya-form-error-msg" data-bound-to="gigya-login-form" aria-atomic="true" role="alert">
                    </div>
                </div>
                <div className='flex items-center'>
                    <input id='loginRememberMe' type="checkbox" name='remember' value={true} className=""
                        defaultChecked="checked" />
                    <label htmlFor="loginRememberMe" className="cursor-pointer">
                        {getSpecificLabel(signInData, 'remember_me_checkbox_label')}
                    </label>
                </div>
                <div>
                    <button type="button" data-switch-screen="gigya-forgot-password-screen">{getSpecificLabel(signInData, 'forgot_password_link_label')}</button>
                </div>
                <div>
                    {parse(getSpecificLabel(sharedData, 'terms_and_conditions'))}
                </div>
                <div>

                    <button
                        type="submit"
                        className="tm-button primary-black"
                    >
                        {getSpecificLabel(signInData, 'sign_in_button_label')}
                    </button>
                </div>

            </div>
        </form>
    );
}

export default LoginScreen;