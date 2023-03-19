import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
// import Home from "./scenes/home/Home"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    }
])

export default router