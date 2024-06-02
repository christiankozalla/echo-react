import React, { useState } from "react";

export default function Overview(props) {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>Here are the props {JSON.stringify(props)}</div>
            <div>Count: {count}</div>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    )
}