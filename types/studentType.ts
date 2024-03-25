import { JsonValue } from "@prisma/client/runtime/library"

export type certificateType = {
    id: string | null,
    path: string | null,
    src: string | null,
}
export type studentType = {
    id:string | null,
    name:string | null,
    studentId:string | null,
    certificateData:certificateType | JsonValue | null,
    eventId:string | null
}