import { createElement as h, useState } from "react";

const App = () => {
    const [ count, setCount ] = useState(0)
    return h(
        "div", 
        null,
        h("h1", null, "Hello"),
        h("p", null, "This is SSR"),
        h("button", { onClick: () => setCount(count + 1)}, `Count: ${count}`)
    );
}

export default App
