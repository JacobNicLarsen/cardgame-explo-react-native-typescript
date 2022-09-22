export type Card = {
    image: string;
    value: string;
    suit: string;
    code: string;
}

export type CardResponse = {
    success: boolean;
    cards: Card[];
    deck_id: string;
    remaining: number;
}