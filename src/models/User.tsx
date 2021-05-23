export interface IUser {
	name: string;
	email: string;
	picture: Picture;
	id: string;
    accessToken: string;
}

export interface Picture {
    data: PictureData;
}

export interface PictureData {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
}