import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Store';
// import Random2 from "./Random2";
import { ref, onValue, set, getDatabase } from "firebase/database";
import database from "../api/Api";

const Random = () => {
    const [state, setState] = useContext(Context)
    const [clicks, setClicks] = useState(1)

    const starCountRef = ref(database(), 'totalVisits');

    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setClicks(data)
            console.log('changeState')
        });
    }, []);

    const addCount = () => {
        console.log('asdasd')
        set(ref(database(), 'totalVisits'), clicks + 1);

    }

    return (
        <>
            <h2>im a cool components</h2>
            <p onClick={addCount}>total clicks: {clicks}</p>

            {/* <Random2></Random2> */}
        </>

    )
}

export default Random;