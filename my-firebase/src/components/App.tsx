import { useState } from "react"
import Routers from "./Routers"
import { authService } from "../FBase"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
	return (
		<>
			<Routers isLoggedIn={isLoggedIn} />
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	)
}

export default App
