export interface Note {
    "id": number;
    "title": string;
    "content": string;
    "createdAt": Date;
    "updatedAt": Date;
    "tag": "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

}