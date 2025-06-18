import { createRoot } from "react-dom/client";
import axios from "axios";

import App from "./01.app/App";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(<App />);
