export interface Identifiable {
	id: number
}

export interface ErrorHandler {
	status: number
	message: string
}

export interface UserEntry extends Identifiable {
	name: string
	username: string
	email: string
	address: {
		street: string
		suite: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	phone: string
	website: string
	company: {
		name: string
		catchPhrase: string
		bs: string
	}
}

export interface AlbumEntry extends Identifiable {
	userId: number
	title: string
}

export interface AlbumResponse extends Identifiable {
	title: string
	user: UserEntry
}

export interface PhotoEntry extends Identifiable {
	albumId: number
	title: string
	url: string
	thumbnailUrl: string
}

export interface PhotoResponse extends Identifiable {
	title: string
	url: string
	thumbnailUrl: string
	album: AlbumResponse
}