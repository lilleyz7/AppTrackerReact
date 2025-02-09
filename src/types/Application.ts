export interface Application{
    id: string,
    title: string, 
    company: string, 
    notes: string, 
    status: string,
    dateAdded: string,
    userId: string,
    link: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customUser: any
}