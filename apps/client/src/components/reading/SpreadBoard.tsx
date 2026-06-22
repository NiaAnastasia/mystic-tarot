import { useState } from "react";
import { cardsApi } from "../../api/cards";
import { readingsApi } from "../../api/readings";
import { useReadingStore } from "../../store/readingStore";
import { useInterpretation } from "../../hooks/useInterpretation";
import { TarotCard } from "../cards/TarotCard";
import { Button } from "../ui/Button";
import { SPREAD_POSITIONS } from "@mystic-tarot/shared";

export const SpreadBoard = () => {
  const { spreadType, question, cards, setCards, setReadingId, reset } =
    useReadingStore();
  const { streamInterpretation } = useInterpretation();
  const [loading, setLoading] = useState(false);
  const [drawn, setDrawn] = useState(false);

  const positions = SPREAD_POSITIONS[spreadType] || [];

  const drawCards = async () => {
    setLoading(true);
    try {
      const count = positions.length;
      const randomCards = await cardsApi.getRandom(count);
      const mapped = randomCards.map(
        (
          c: {
            id: string;
            nameEn: string;
            nameRu: string;
            imageUrl: string;
            isReversed: boolean;
          },
          i: number,
        ) => ({
          cardId: c.id,
          nameEn: c.nameEn,
          nameRu: c.nameRu,
          imageUrl: c.imageUrl,
          position: positions[i],
          isReversed: c.isReversed,
          order: i,
        }),
      );
      setCards(mapped);
      setDrawn(true);
    } finally {
      setLoading(false);
    }
  };

  const interpret = async () => {
    setLoading(true);
    try {
      const reading = await readingsApi.create({
        spreadType,
        question: question || undefined,
        cards: cards.map((c) => ({
          cardId: c.cardId,
          position: c.position,
          isReversed: c.isReversed,
          order: c.order,
        })),
      });
      setReadingId(reading.id);
      await streamInterpretation(reading.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      {!drawn ? (
        <Button onClick={drawCards} disabled={loading}>
          {loading ? "Drawing..." : "Draw Cards"}
        </Button>
      ) : (
        <>
          <div className="flex flex-wrap gap-6 justify-center">
            {cards.map((c, i) => (
              <TarotCard
                key={i}
                card={{
                  id: c.cardId,
                  nameEn: c.nameEn,
                  nameRu: c.nameRu,
                  imageUrl: c.imageUrl,
                  number: i,
                  arcana: "",
                }}
                isReversed={c.isReversed}
                isFlipped={true}
                position={c.position}
                size="md"
              />
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={interpret} disabled={loading}>
              {loading ? "Reading..." : "Get Interpretation"}
            </Button>
            <Button variant="ghost" onClick={reset}>
              New Reading
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
