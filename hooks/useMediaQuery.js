"use client"
import { useEffect, useState } from "react";

export default function useMediaQuery(query) {

    const [matches, setMatches] = useState(false);

    function handleChange(e) {
        setMatches(e.matches);
    }

    useEffect(() => {
        const matchQueryList = window.matchMedia(query);
        handleChange(matchQueryList)
        matchQueryList.addEventListener("change", handleChange);
        return () => {
            matchQueryList.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}