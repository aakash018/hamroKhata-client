interface IAakash {
    Deekshit: Number,
    Subash: Number,
    Yaman: Number
}

interface IDeekshit {
    Aakash: Number,
    Subash: Number,
    Yaman: Number
}

interface ISubash {
    Aakash: Number,
    Deekshit: Number,
    Yaman: Number
}

interface IYaman {
    Aakash: Number,
    Deekshit: Number, 
    Subash: Number
}

export interface IAudit {
    [key: number] : number,
    Aakash: IAakash,
    Deekshit: IDeekshit,
    Subash: ISubash,
    Yaman: IYaman,
    message: string
}