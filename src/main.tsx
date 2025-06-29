import { createRoot } from "react-dom/client";
import { Root } from "ui";
import "ui/theme.css";

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);
