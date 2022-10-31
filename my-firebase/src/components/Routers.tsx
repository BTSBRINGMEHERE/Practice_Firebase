import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "../routes/Auth"
import Home from "../routes/Home"
import Profile from "../routes/Profile"
import Navigation from "./Navigation"

const Routers = ({ refreshUser, isLoggedIn, userObj }: any) => {
	return (
		<BrowserRouter>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route path="/" element={<Home userObj={userObj} />} />
						<Route
							path="Profile"
							element={<Profile userObj={userObj} refreshUser={refreshUser} />}
						/>
					</>
				) : (
					<Route path="/" element={<Auth />}></Route>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default Routers
