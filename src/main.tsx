import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home";

import "./style.css";
const root = createRoot(document.getElementById("app")!);

root.render(<Home />);
