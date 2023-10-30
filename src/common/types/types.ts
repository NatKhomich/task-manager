export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
}
