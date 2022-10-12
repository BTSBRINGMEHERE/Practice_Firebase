import { useState } from "react"
import Routers from "./Routers"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	return (
		<>
			<Routers isLoggedIn={isLoggedIn} />
		</>
	)
}

export default App
