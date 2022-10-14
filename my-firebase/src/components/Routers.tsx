import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "../routes/Auth"
import Home from "../routes/Home"
import Profile from "../routes/Profile"
import Navigation from "./Navigation"

const Routers = ({ isLoggedIn }: any) => {
	return (
		<BrowserRouter>
			{isLoggedIn && <Navigation />}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route path="/" element={<Home />} />
						<Route path="Profile" element={<Profile />} />
					</>
				) : (
					<Route path="/" element={<Auth />}></Route>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default Routers
