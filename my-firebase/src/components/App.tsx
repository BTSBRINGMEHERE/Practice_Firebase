import { useEffect, useState } from "react"
import Routers from "./Routers"
import { authService } from "../FBase"

function App() {
	const [init, setInit] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true)
			} else {
				setIsLoggedIn(false)
			}
			setInit(true)
		})
	}, [])
	return (
		<>
			{init ? <Routers isLoggedIn={isLoggedIn} /> : "Initailizing...."}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	)
}

export default App
