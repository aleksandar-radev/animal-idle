import React, { useEffect, useState } from 'react';
// import { Context } from '../Store';
// import Random2 from "./Random2";
import { ref, onValue, set } from "firebase/database";
import api from "../api/Api";
import "./Random.scss";

const Random = () => {
    // const [state, setState] = useContext(Context)
    const [clicks, setClicks] = useState(undefined)


    useEffect(() => {
        api().getTotalClicks(setClicks);
    }, []);

    const addCount = () => {
        console.log('add')
        if (!clicks) return;
        set(ref(api().database, 'totalVisits'), clicks + 1);

    }

    return (
        <>
            <p onClick={addCount} className="Random">total clicks: {clicks}</p>
        </>
    )
}

export default Random;