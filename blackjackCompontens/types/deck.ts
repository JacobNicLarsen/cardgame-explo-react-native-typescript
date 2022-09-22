export type Deck = {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;

}

export type Decks = {
    decks: Deck[]
}