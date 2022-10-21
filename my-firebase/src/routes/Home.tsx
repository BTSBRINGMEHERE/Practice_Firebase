import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { dbService, storageService } from "../FBase"
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
} from "firebase/firestore"
import { ref, uploadString, getDownloadURL } from "firebase/storage"
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
	const [attachment, setAttachment] = useState<any>("")

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
		let attactmentURL = ""
		if (attachment !== "") {
			const attactmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
			const response = await uploadString(attactmentRef, attachment, "data_url")
			attactmentURL = await getDownloadURL(response.ref)
		}
		const nweetObj = {
			text: nweet,
			createdAt: Date.now(),
			createdId: userObj.uid,
			attactmentURL,
		}
		await addDoc(collection(dbService, "nweets"), nweetObj)
		setNweet("")
		setAttachment("")
	}
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event
		setNweet(value)
	}
	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { files },
		} = event as any
		const theFile = files[0]
		const reader = new FileReader()
		reader.onloadend = (finishedEvent: any) => {
			const {
				currentTarget: { result },
			} = finishedEvent
			setAttachment(result)
		}
		reader.readAsDataURL(theFile)
	}
	const onClearAttachment = () => {
		setAttachment("")
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
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="Nweet" />
				{attachment && (
					<div>
						<img src={attachment} width="50px" />
						<button onClick={onClearAttachment}>Clear image</button>
					</div>
				)}
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
