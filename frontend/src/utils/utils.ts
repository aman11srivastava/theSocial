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
