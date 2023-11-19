export interface Task {
    id: number,
    userId: number,
    title: string,
    description: string,
    statusCode: string, 
    createdTime: Date,
    updatedTime: Date
}