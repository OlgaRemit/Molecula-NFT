import Web3 from "web3"
import 'regenerator-runtime/runtime'
import axios from "axios"
import { mintNewToken } from "./mint/script"

const provider = (window as any).ethereum
export const web3 = new Web3(provider)

// @ts-ignore
const linkInput: HTMLInputElement = document.getElementById("link")

// @ts-ignore
const collectionInput: HTMLInputElement = document.getElementById("collection")

document.getElementById("connect")?.addEventListener("click", (e) => {
	e.preventDefault()
	provider.enable()
})

document.getElementById("mint")?.addEventListener("click", (e) => {
	e.preventDefault()
	mintNewToken(collectionInput.value, web3)
		.then(x => {
			console.log("SENT", x)
			// @ts-ignore
			linkInput.value = x
		})
		.catch(err => console.error("ERROR", err))
})
