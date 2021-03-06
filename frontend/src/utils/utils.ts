export type userReducerActionType = {
    type: string
    payload: any
}

export type imageStructure = {
    public_id: string
    url: string
}

export type userRegistrationObj = {
    email: string
    name: string
    password: string
    avatar: string | ArrayBuffer | null
}

export interface userStructure {
    name: string
    email: string
    avatar: imageStructure
    posts?: any[]
    followers?: any[]
    following?: any[]
    _id: string
}

export interface postStructure {
    postId: string
    caption: string
    postImage: string
    likes: any[]
    comments: any[]
    ownerImage: string
    ownerName: string
    ownerId: string
}

export type postStructureType = {
    _id: string
    caption: string
    image: imageStructure
    owner: userStructure
    likes: any[]
    comments: any[]
}

export const following: string = "following";
export const followers: string = "followers";

export const application_json_config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export type updateProfileObjType = {
    name: string
    email: string
    avatar: string | ArrayBuffer | null
    avatarPrev?: string | ArrayBuffer | null
}
