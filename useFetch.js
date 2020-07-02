import { useState, useEffect, useRef } from "react"

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        error: null,
        loading: true
    });

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setState({
            data: null,
            error: null,
            loading: true
        });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        error: null,
                        loading: false,
                        data
                    })
                }
            })
            .catch(error => {
                if (isMounted.current) {
                    setState({
                        error,
                        loadind: false,
                        data: null
                    })
                }
            });
    }, [url])

    return state;

}
