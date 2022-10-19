import { useEffect, useState } from "react"
import Routers from "./Routers"
import { authService } from "../FBase"

function App() {
	const [init, setInit] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userObj, setUserObj] = useState<any>(null)
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true)
				setUserObj(user)
			} else {
				setIsLoggedIn(false)
			}
			setInit(true)
		})
	}, [])
	return (
		<>
			{init ? (
				<Routers isLoggedIn={isLoggedIn} userObj={userObj} />
			) : (
				"Initailizing...."
			)}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	)
}

export default App
