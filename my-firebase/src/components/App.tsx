import { useEffect, useState } from "react"
import Routers from "./Routers"
import { authService } from "../FBase"
import { updateCurrentUser, updateProfile } from "firebase/auth"

function App() {
	const [init, setInit] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userObj, setUserObj] = useState<any>(null)
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args: any) =>
						updateProfile(user, { displayName: user.displayName }),
				})
			}
			setInit(true)
		})
	}, [])

	const refreshUser = async () => {
		await updateCurrentUser(authService, authService.currentUser)
		setUserObj(authService.currentUser)
	}

	return (
		<>
			{init ? (
				<Routers
					refreshUser={refreshUser}
					isLoggedIn={Boolean(userObj)}
					userObj={userObj}
				/>
			) : (
				"Initailizing...."
			)}
		</>
	)
}

export default App
