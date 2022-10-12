import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import Firebase from "./Firebase"

console.log(Firebase)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
