"use client"
import useMediaQuery from "./useMediaQuery";
import configuration from "../constants/configuration";

function useMediaQueryHook() {

    const isSmallDevice = useMediaQuery(`only screen and (max-width : ${configuration.bpMobile}px)`);
    const isMediumDevice = useMediaQuery(
        `only screen and (min-width : ${configuration.bpMobile + 1}px) and (max-width : ${configuration.bpTablet}px)`
    );
    const isLargeDevice = useMediaQuery(
        `only screen and (min-width : ${configuration.bpTablet}px) and (max-width : ${configuration.bpDesktop}px)`
    );
    const isExtraLargeDevice = useMediaQuery(
        `only screen and (min-width : ${configuration.bpDesktop}px)`
    );

    return { isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice };
}

export default useMediaQueryHook;