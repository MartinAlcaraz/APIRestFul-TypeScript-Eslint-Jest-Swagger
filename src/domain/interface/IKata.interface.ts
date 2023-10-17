export enum KataLevel {
    BASIC = 'Basic',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export interface IKata {
    name: String,
    description: String,
    level: KataLevel,
    intents: Number,
    stars: Number,
    creatorId: String, // id of user
    solution: String,
    participants: String[]
}
