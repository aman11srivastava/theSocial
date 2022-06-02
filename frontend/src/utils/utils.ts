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
    image?: imageStructure
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
