import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { dbService } from "../FBase"
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
} from "firebase/firestore"
import Nweet from "../components/Nweet"

interface NweetType {
	id?: string
	text?: string
	creatAt?: Timestamp
	createdId?: string
}

const Home = ({ userObj }: any) => {
	const [nweet, setNweet] = useState("")
	const [nweets, setNweets] = useState<NweetType[]>([])

	useEffect(() => {
		const queries = query(
			collection(dbService, "nweets"),
			orderBy("createdAt", "desc")
		)
		onSnapshot(queries, (snapshot) => {
			const nweetArr = snapshot.docs.map((docs) => ({
				id: docs.id,
				...docs.data(),
			}))
			setNweets(nweetArr)
		})
	}, [])
	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await addDoc(collection(dbService, "nweets"), {
			text: nweet,
			createdAt: Date.now(),
			createdId: userObj.uid,
		})
		setNweet("")
	}
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event
		setNweet(value)
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					value={nweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type="submit" value="Nweet" />
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet
						key={nweet.id}
						nweetObj={nweet}
						isOwner={nweet.createdId === userObj.uid}
					/>
				))}
			</div>
		</>
	)
}

export default Home
