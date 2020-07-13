
export class Album {
    id: string;
    ref: string;
    name: string;
    title: string;
    description: string;
    duration: number;
    status: string;
    url?: string;
    like?: string;
    tags?: Array<string>
}

export class List {
    id: string;
    list: Array<string>;
}

// type pour notre horloge
// On peut également utiliser une interface
export class Timer {
    hour: string;
    minute: string;
    second: string;
}