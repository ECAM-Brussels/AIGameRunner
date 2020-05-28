function isImage(url) {
	const extensions = ['.gif', '.png', '.jpg']

	for(extension of extensions) {
		if(url.endsWith(extension)) {
			return true
		}
	}

	return false
}

self.oninstall = evt => {
	console.log("oninstall")

	//evt.waitUntil()
	self.skipWaiting()
}

self.onactivate = evt => {
	console.log("onactivate")

	//clean caches if needed
	// ...

	self.clients.claim()
}

self.onfetch = evt => {
	console.log("onfetch")
	evt.respondWith(
		caches.match(evt.request)
			.then(response => {
				if(response) {
					console.log(evt.request.url + " found in cache")
					return response
				}
				
				return fetch(evt.request)
					.then(response => {
						if(isImage(evt.request.url)) {
							console.log(evt.request.url + 'is an image => add to cache')
							const resClone = response.clone()
							caches
								.open('images')
								.then(cache => {
									cache.put(evt.request, resClone)
								})
						}
						return response
					})
			})
	)
}