import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import { app } from "./FBase"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// console.log(app)
const queryclient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryclient}>
		<App />
	</QueryClientProvider>
)
