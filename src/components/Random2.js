import React, {useContext} from 'react';
import { Context } from '../Store';

const Random2 = () => {
const[state] = useContext(Context)

return (
<>
<h2>im a cool components</h2>
<p>name: {state.name} </p>
</>

)
}

export default Random2;