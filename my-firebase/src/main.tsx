import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import { app } from "./FBase"

console.log(app)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
