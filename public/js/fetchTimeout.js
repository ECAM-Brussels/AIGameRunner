export const fetchTimeout = (url, options, timeout) => {
	return new Promise((resolve, reject) => {
		let didTimeout = false

		const timer = setTimeout(() => {
			didTimeout = true
			reject({error: "Time Out"})
		}, timeout)

		fetch(url, options)
		.then((response) => {
			clearTimeout(timer)
			if(!didTimeout) resolve(response)
		})
		.catch((err) => {
			if(!didTimeout) reject(err)
		})
	})
}