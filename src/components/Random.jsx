import React, { useEffect, useState } from 'react';
// import { Context } from '../Store';
// import Random2 from "./Random2";
import { ref, onValue, set } from "firebase/database";
import database from "../api/Api";

const Random = () => {
    // const [state, setState] = useContext(Context)
    const [clicks, setClicks] = useState(undefined)

    
    useEffect(() => {
        const starCountRef = ref(database(), 'totalVisits');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setClicks(data)
            console.log('changeState')
        });
    }, []);

    const addCount = () => {
        console.log('asdasds')
        if (!clicks) return;
        set(ref(database(), 'totalVisits'), clicks + 1);

    }

    return (
        <>
            <p onClick={addCount}>total clicks: {clicks}</p>
        </>
    )
}

export default Random;