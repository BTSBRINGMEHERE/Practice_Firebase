import React, { ChangeEvent, FormEvent, useState } from "react"
import { dbService } from "../FBase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"

const Nweet = ({ nweetObj, isOwner }: any) => {
	const [editing, setEditing] = useState(false)
	const [newNweet, setNewNweet] = useState(nweetObj.text)

	const changeNweet = doc(dbService, "nweets", `${nweetObj.id}`)
	const onDeleteClick = async () => {
		const ok = window.confirm("지울꺼임?")

		if (ok) {
			await deleteDoc(changeNweet)
		}
		console.log(ok)
	}

	const toggleEditing = () => setEditing((prev) => !prev)

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await updateDoc(changeNweet, { text: newNweet })
		setEditing(false)
	}

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event
		setNewNweet(value)
	}
	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							placeholder="Edit your Nweet"
							value={newNweet}
							onChange={onChange}
							required
						/>
						<input type="submit" value="Update Nweet" />
					</form>
					<button onClick={toggleEditing}>Cancle</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>삭제</button>
							<button onClick={toggleEditing}>수정</button>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default Nweet
