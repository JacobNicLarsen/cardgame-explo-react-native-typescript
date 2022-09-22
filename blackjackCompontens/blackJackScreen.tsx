import { Button, Layout, Text } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { Deck } from "./types/deck";
import { Card, CardResponse } from "./types/card";
import { Spinner, Card as KittenCard } from "@ui-kitten/components";
import { Image } from "react-native";

function BlackJackScreen() {
  const [deck, setDeck] = useState<Deck>();
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const axios = require("axios").default;

  const getDeck = async () => {
    setIsLoading(true);
    console.log("Halla", isLoading, "Mann");
    try {
      await axios
        .get("http://deckofcardsapi.com/api/deck/new/")
        .then((response: any) => response.data)
        .then((data: Deck) => {
          setDeck(data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const ShowDeck = () => {
    return (
      <KittenCard>
        <Text>Remaining Cards:</Text>
        <Text>{deck?.remaining}</Text>
      </KittenCard>
    );
  };

  const drawCard = async (numberOfCards: number) => {
    try {
      await axios
        .get("http://deckofcardsapi.com/api/deck/" + deck?.deck_id + "/draw/", {
          params: {
            count: numberOfCards,
          },
        })
        .then((response: any) => response.data)
        .then((data: CardResponse) => {
          console.log(data);
          data.cards.map((card) => {
            setDrawnCards([...drawnCards, card]);
          });
          setCurrentCard(data.cards[0]);
          console.log("Current Card image", currentCard);
          deck && setDeck({ ...deck, remaining: data.remaining });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const DrawCardButtion = () => {
    return <Button onPress={() => drawCard(1)}>Draw Card</Button>;
  };

  const CardLayout = () => {
    return (
      <KittenCard>
        <Image
          style={{ width: 400, height: 400 }}
          source={{ uri: currentCard?.image }}
        />
      </KittenCard>
    );
  };

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <>
          <Text> Getting new deck.... </Text>
          <Spinner />
        </>
      ) : (
        <>
          <ShowDeck />
          <DrawCardButtion />
          <CardLayout />
        </>
      )}
    </Layout>
  );
}

export default BlackJackScreen;
