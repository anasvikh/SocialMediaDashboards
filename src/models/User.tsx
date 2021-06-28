export interface IUser {
	name: string;
	email: string;
	picture: IPicture;
	id: string;
    accessToken: string;
}

export interface IPicture {
    data: IPictureData;
}

export interface IPictureData {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
}

export interface ILookup {
    id: number;
    name: string;
}

export interface IInstUser {
	biography: string;
	id: string;
	ig_id: number;
	followers_count: number;
	follows_count: number;
	media_count: number;
	name: string;
	profile_picture_url: string;
	username: string;
}

