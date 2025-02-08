export interface Application{
    id: string,
    title: string, 
    company: string, 
    notes?: string, 
    status: string,
    dateAdded: string,
    userId: string,
    link?: string
}