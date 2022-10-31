import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { authService, dbService } from "../FBase"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { updateProfile } from "firebase/auth"

export default function Profile({ refreshUser, userObj }: any) {
	const navigate = useNavigate()
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
	const onLogOutClick = () => {
		authService.signOut()
		navigate("/")
	}

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event
		setNewDisplayName(value)
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if (userObj.displayName !== newDisplayName) {
			await updateProfile(userObj, {
				displayName: newDisplayName,
			})
			refreshUser()
		}
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					type="text"
					placeholder="Display Name"
					value={newDisplayName}
				/>
				<input type="submit" value="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	)
}
