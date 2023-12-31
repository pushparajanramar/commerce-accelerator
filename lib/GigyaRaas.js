/**
 * ---------------------
 * # Gigya RaaS JS File
 * ---------------------
 *
 * This file includes all functions that interact with Gigya screensets, events and WebSDK capabilities.
 *
 * The included operations OOTB are:
 *
 *  - register: shows registration screenset (embedded in a div).
 *  - login: shows login screenset (in popup)
 *  - logout: logs out the user from the page.
 *  - update profile: shows profile update screenset (embedded in a div).
 *  - show profile: shows profile overview screenset.
 *  - change password: shows profile overview screenset.
 *  - subscribe (no password implied): shows lite registration screenset
 *
 * Visit the documentation page to get the full list of operations that you can perform using screensets:
 * [Default Screensets](https://developers.gigya.com/display/GD/Default+Screen-sets)
 *
 * Attached to these screensets, we have some event functions, that they modify/include new logic, or perform some UX
 * in certain moments. In this file there are X of them included:
 *
 *  - onAfterScreenLoad: triggered after the screen is rendered in page
 *  - onBeforeSubmit: triggered before the data it's submitted
 *  - onSubmit: triggered when a form is submitted
 *
 * For a full list of these events, please visit the documentation page:
 * [Screenset Events](https://developers.gigya.com/display/GD/Default+Screen-sets)
 *
 * Finally, there are two functions for Gigya global events (onLogin & onLogout), that they are called after performing
 * those two operations and readapt the UI accordingly.
 *
 *  - onLogin: triggered after getting a valid session from Gigya
 *  - onLogout: triggered after completed a succesful logout in Gigya.
 *
 * For a full explanation for these events, please visit the documentation page:
 * [Global Events](https://developers.gigya.com/display/GD/Events#Events-GlobalApplicationEventsGlobalApplicationEvents)
 *
 *
 * @link   https://github.com/gigya/cdc-starter-kit/blob/master/js/gigya-raas.js
 * @file   This file defines the main functions to make the demo site work.
 * @author juan.andres.moreno@sap.com
 * @since  1.0.0
 */

/** *****************************************************/
//             GIGYA SCREENSET FUNCTIONS
/** *****************************************************/
/**
 * This function shows the registration form inside 'not_logged_placeholder' div.
 * @param  {string} containerID The container ID for the register page
 * @param  {function} onAfterScreeLoadIfDefined Function to be executed after a succesful load of the screenset (if defined)
 */

const config = {
    "raas_prefix": "NewRaas4nov15",
    "lang": "en",
    "screensets": [
        "simple-RegistrationLogin-set",
        "simple-screen-set",
        "passwordContainer",
        "profileContainer"
    ]
}

export function loginRegister({ isNew, callback, onError, onBeforeSubmit, containerID, onAfterSubmit }) {
    /* Launch Screenset */
    let screenset = 'gigya-login-screen'
    if (isNew) {
        screenset = 'gigya-register-screen'
    }
    gigya.accounts.showScreenSet({
        // screenSet: `${config.raas_prefix}-RegistrationLogin`,
        screenSet: `simple-screen-set`,
        startScreen: screenset,
        // lang: window.config.lang,
        // containerID, // <-- if we omit this property the screen it's shown in a pop-up
        // containerID,
        // Some sample events..
        onError,
        onBeforeSubmit,
        onSubmit,///this event called when on submit method triggered
        // onAfterScreenLoad: onAfterScreenLoadIfDefined
        onAfterSubmit
    });

    /* Actions associated to events. - If autologin enabled -  */
    gigya.accounts.addEventHandlers({
        onLogin: callback ? callback : onLogin,
    });
}

export function loginRegisterWithResetPassword({ callback, onError, onBeforeSubmit, containerID }) {
    /* Launch Screenset */

    gigya.accounts.showScreenSet({
        // screenSet: `${config.raas_prefix}-RegistrationLogin`,
        screenSet: `simple-reset-screen-set`,
        startScreen: 'gigya-reset-password-screen',
        // lang: window.config.lang,
        // containerID, // <-- if we omit this property the screen it's shown in a pop-up
        containerID,
        // Some sample events..
        onError,
        onBeforeSubmit,
        onSubmit,///this event called when on submit method triggered
        // onAfterScreenLoad: onAfterScreenLoadIfDefined

    });

    /* Actions associated to events. - If autologin enabled -  */
    gigya.accounts.addEventHandlers({
        onLogin: callback ? callback : onLogin,
    });
}


export function registerWithRaaS(onAfterScreenLoadIfDefined, loginCallback) {

    /* Launch Screenset */
    gigya.accounts.showScreenSet({
        // screenSet: `${config.raas_prefix}-RegistrationLogin`,
        screenSet: `simple-RegistrationLogin-set`,
        startScreen: 'gigya-register-screen',
        // lang: window.config.lang,
        // containerID, // <-- if we omit this property the screen it's shown in a pop-up

        // Some sample events..
        onBeforeSubmit,
        onSubmit,///this event called when on submit method triggered
        onAfterScreenLoad: onAfterScreenLoadIfDefined
    });

    /* Actions associated to events. - If autologin enabled -  */
    gigya.accounts.addEventHandlers({
        onLogin: loginCallback ? loginCallback : onLogin,
    });

}

/**
 *
 * This function shows the login form in a popup.
 * @param  {string} containerID The container ID for the login page
 * @param  {function} onAfterScreeLoadIfDefined Function to be executed after a succesful load of the screenset (if defined)
 */
export function loginWithRaaS({ onLoginHandler, onError, onBeforeSubmit }) {
    /* Launch Screenset */
    gigya.accounts.showScreenSet({
        screenSet: `simple-screen-set`,
        //screenSet: `${config.raas_prefix}-RegistrationLogin`,
        startScreen: "gigya-login-screen",
        // lang: window.config.lang,
        // containerID,

        // Events..
        // onAfterScreenLoad: onAfterScreenLoadIfDefined,
        onError,
        onBeforeSubmit
    });

    /* Actions associated to events */
    gigya.accounts.addEventHandlers({
        onLogin: onLoginHandler,
    });

}

export function getJWTToken(callback) {
    gigya.accounts.getJWT({ callback });
}

export function getProfileInformation(callbackHandler) {
    gigya.accounts.getAccountInfo({ include: 'emails, profile, data, preferences', callback: callbackHandler });
}

/**
 * This function shows the edit profile form inside 'edit_profile_placeholder' div.
 * @param  {string} containerID The container ID for the edit profile page
 */
export function editProfileWithRaaS(containerID, callback) {

    /* Launch Screenset */
    gigya.accounts.showScreenSet({
        screenSet: `profileContainer-screen-set`,
        // screenSet: `${config.raas_prefix}-ProfileUpdate`,
        startScreen: 'gigya-update-profile-screen',
        // lang: window.config.lang,
        containerID,
        onAfterSubmit: callback
    });
}

/**
 * This function shows the lite registration form in a popup.
 * @param  {string} containerID The container ID for the lite registration page
 */
export function liteRegisterWithRaaS(containerID) {

    /* Launch Screenset */
    gigya.accounts.showScreenSet({
        screenSet: `${config.raas_prefix}-LiteRegistration`,
        startScreen: 'gigya-subscribe-with-email-screen',
        // lang: window.config.lang,
        // containerID
    });
}

/**
 * This function shows the profile form in a popup for logged in users.
 * @param  {string} containerID The container ID for the register page
 */
export function changePasswordWithRaaS(containerID, callback) {

    // Launch Screenset
    gigya.accounts.showScreenSet({
        screenSet: `simple-password-set`,
        // screenSet: `${config.raas_prefix}-ProfileUpdate`,
        startScreen: 'gigya-change-password-screen',
        // lang: window.config.lang,
        containerID,
        onAfterSubmit: callback
    });
}

/**
 * * This function hides the screenset contained in 'containerID' param.
 * @param {string} containerID the id of the HMTL element containing the form
 */
export function hideScreenset(containerID) {
    gigya.accounts.hideScreenSet({ containerID });
}

/**
 * This function logs out a user from the website, and triggers an event (onLogout), to perform some operations
 * after the operation is finished.
 * @param {function} callBackFunction the id of the HMTL element containing the form
 */
export function logoutWithRaaS(callBackFunction) {

    /* Actions associated to events */
    // gigya.accounts.addEventHandlers({
    //     onLogout: onLogout
    // });


    /* After the logout, we show the register screen again (as in the beginning) */
    gigya.accounts.logout({ callback: callBackFunction });
}

/** **************************************************/
//       GIGYA SCREENSET EVENT FUNCTIONS
/** **************************************************/
/**
 * A reference to a function that will be called before a new screen is rendered.
 * @param  {object} event Form Event object
 */
export function onAfterScreenLoad(event) { }

/**
 * Event handler function that will be called before a form is submitted.
 * @param  {object} event Form Event object
 * @returns {boolean} Flag that controls if submission must continue or not
 */
function onBeforeSubmit(event) {
    return true;
}

/**
 * Event handler function that will be called when a form is submitted.
 * @param  {object} event Form Event object
 */
export function onSubmit(event) { }

/** **************************************************/
//       GIGYA GLOBAL EVENT FUNCTIONS
/** **************************************************/
/**
 * This event is fired whenever a user successfully logs in to Gigya.
 * @param  {object} response Gigya response with the results of the login operation
 */
export function onLogin(response) {
    console.log('onLogin', response);
    // Get the user information, redirecting if needed to the logged in page
    if (response.profile !== null) {
        gigya.accounts.getAccountInfo({ include: 'emails, profile, data, preferences', callback: initPage });
    }
}

/**
 * This event is fired whenever a user successfully logs out to Gigya.
 * @param  {object} response Gigya response with the results of the logout operation
 */
export function onLogout(response) {

    // Shows the unlogged HTML of the page
    if (response.eventName === 'logout') {
        console.log('X. User has logged out', "LOG OUT");
        //hideModal("logging-out");
        // gotoHome();
    } else {
        alert('Error :' + response.errorMessage);
    }
}

/** **************************************************/
