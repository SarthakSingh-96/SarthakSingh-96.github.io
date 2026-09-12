"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coins, Hand, RotateCcw, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";

type Suit = "spades" | "hearts" | "diamonds" | "clubs";
type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";
type Card = {
  suit: Suit;
  rank: Rank;
};
type GameStatus = "betting" | "player-turn" | "round-over";

const suits: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suitSymbols: Record<Suit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

const createDeck = () =>
  suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })));

const shuffleDeck = (cards: Card[]) => {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const getCardValue = (rank: Rank) => {
  if (rank === "A") return 11;
  if (["J", "Q", "K"].includes(rank)) return 10;
  return Number(rank);
};

const getHandValue = (hand: Card[]) => {
  let total = hand.reduce((sum, card) => sum + getCardValue(card.rank), 0);
  let aces = hand.filter((card) => card.rank === "A").length;

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
};

const isBlackjack = (hand: Card[]) => hand.length === 2 && getHandValue(hand) === 21;

const drawCard = (deck: Card[]) => {
  const [card, ...remainingDeck] = deck;
  return {
    card,
    deck: remainingDeck.length < 10 ? shuffleDeck(createDeck()) : remainingDeck,
  };
};

function PlayingCard({
  card,
  hidden = false,
  index = 0,
  compact = false,
}: {
  card?: Card;
  hidden?: boolean;
  index?: number;
  compact?: boolean;
}) {
  const isRed = card?.suit === "hearts" || card?.suit === "diamonds";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 120, y: -80, rotate: 12, scale: 0.72 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: index % 2 ? 3 : -2, scale: 1 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.04 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        delay: index * 0.08,
      }}
      className={cn(
        "relative flex aspect-[2.5/3.5] shrink-0 flex-col justify-between rounded-xl border p-2 shadow-xl shadow-black/30",
        compact ? "w-[46px] sm:w-[54px]" : "w-[72px] sm:w-[84px]",
        hidden
          ? "border-[#D7E2EA]/20 bg-[linear-gradient(135deg,#111316,#25313a)]"
          : "border-[#10202c]/20 bg-[#F4F7F9]",
        isRed ? "text-[#E85D75]" : "text-[#10202c]",
      )}
    >
      {hidden || !card ? (
        <div className="grid h-full place-items-center rounded-lg border border-[#D7E2EA]/15 bg-[#D7E2EA]/10">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#D7E2EA]/65">
            Deck
          </span>
        </div>
      ) : (
        <>
          <div className="text-left text-lg font-black leading-none">
            {card.rank}
            <span className="block text-xl">{suitSymbols[card.suit]}</span>
          </div>
          <div className="grid h-10 w-10 place-items-center self-center rounded-full border border-current/20 text-3xl leading-none">
            {suitSymbols[card.suit]}
          </div>
          <div className="rotate-180 text-left text-lg font-black leading-none">
            {card.rank}
            <span className="block text-xl">{suitSymbols[card.suit]}</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

function HandView({
  title,
  hand,
  score,
  hideSecondCard = false,
  compact = false,
}: {
  title: string;
  hand: Card[];
  score: number;
  hideSecondCard?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={cn(
      "rounded-[28px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/55 p-4 sm:p-5",
      compact && "p-3 sm:p-3",
    )}>
      <div className={cn("mb-4 flex items-center justify-between gap-4", compact && "mb-3")}>
        <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/55">
          {title}
        </h3>
        <span className="rounded-full border border-[#D7E2EA]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/70">
          {hideSecondCard ? "?" : score}
        </span>
      </div>
      <div className={cn("flex min-h-[118px] flex-wrap gap-3", compact && "min-h-[78px] gap-2")}>
        {hand.map((card, index) => (
          <PlayingCard
            key={`${card.suit}-${card.rank}-${index}`}
            card={card}
            hidden={hideSecondCard && index === 1}
            index={index}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

export function BlackjackGame({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [deck, setDeck] = useState(() => shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [status, setStatus] = useState<GameStatus>("betting");
  const [chips, setChips] = useState(500);
  const [bet, setBet] = useState(25);
  const [message, setMessage] = useState("Place a bet and deal the first hand.");

  const playerScore = useMemo(() => getHandValue(playerHand), [playerHand]);
  const dealerScore = useMemo(() => getHandValue(dealerHand), [dealerHand]);
  const maxBet = Math.max(5, Math.floor(chips / 5) * 5);
  const isWinMessage =
    message.includes("win") || message.includes("Blackjack") || message.includes("beat");
  const isLossMessage =
    message.includes("busted") || message.includes("Dealer wins") || message.includes("takes");

  const updateBet = (nextBet: number) => {
    setBet(Math.max(5, Math.min(maxBet, nextBet)));
  };

  const goAllIn = () => {
    if (status === "player-turn" || chips <= 0) return;
    setBet(maxBet);
    setMessage(`All in for ${maxBet}. Deal when ready.`);
  };

  useEffect(() => {
    if (status !== "player-turn" && bet > maxBet) {
      setBet(maxBet);
    }
  }, [bet, maxBet, status]);

  const finishRound = (
    finalPlayerHand: Card[],
    finalDealerHand: Card[],
    nextChips: number,
    wager = bet,
  ) => {
    const finalPlayerScore = getHandValue(finalPlayerHand);
    const finalDealerScore = getHandValue(finalDealerHand);

    if (finalPlayerScore > 21) {
      setChips(nextChips);
      setMessage("You busted. Dealer takes the hand.");
    } else if (finalDealerScore > 21) {
      setChips(nextChips + wager * 2);
      setMessage("Dealer busted. You win the hand.");
    } else if (finalPlayerScore > finalDealerScore) {
      setChips(nextChips + wager * 2);
      setMessage("You beat the dealer. Nice hand.");
    } else if (finalPlayerScore < finalDealerScore) {
      setChips(nextChips);
      setMessage("Dealer wins this one.");
    } else {
      setChips(nextChips + wager);
      setMessage("Push. Your bet comes back.");
    }

    setStatus("round-over");
  };

  const dealerPlay = (
    currentDeck: Card[],
    currentPlayerHand: Card[],
    currentDealerHand: Card[],
    paidChips: number,
    wager = bet,
  ) => {
    let nextDeck = currentDeck;
    const nextDealerHand = [...currentDealerHand];

    while (getHandValue(nextDealerHand) < 17) {
      const draw = drawCard(nextDeck);
      if (!draw.card) break;
      nextDealerHand.push(draw.card);
      nextDeck = draw.deck;
    }

    setDeck(nextDeck);
    setDealerHand(nextDealerHand);
    finishRound(currentPlayerHand, nextDealerHand, paidChips, wager);
  };

  const deal = () => {
    if (chips < bet) return;

    let nextDeck = deck.length < 15 ? shuffleDeck(createDeck()) : deck;
    const nextPlayerHand: Card[] = [];
    const nextDealerHand: Card[] = [];

    for (let index = 0; index < 2; index += 1) {
      const playerDraw = drawCard(nextDeck);
      if (playerDraw.card) nextPlayerHand.push(playerDraw.card);
      nextDeck = playerDraw.deck;

      const dealerDraw = drawCard(nextDeck);
      if (dealerDraw.card) nextDealerHand.push(dealerDraw.card);
      nextDeck = dealerDraw.deck;
    }

    const paidChips = chips - bet;
    setDeck(nextDeck);
    setPlayerHand(nextPlayerHand);
    setDealerHand(nextDealerHand);
    setChips(paidChips);

    if (isBlackjack(nextPlayerHand)) {
      const payout = isBlackjack(nextDealerHand) ? bet : Math.floor(bet * 2.5);
      setChips(paidChips + payout);
      setStatus("round-over");
      setMessage(
        isBlackjack(nextDealerHand)
          ? "Both hands are blackjack. Push."
          : "Blackjack. You win 3:2.",
      );
      return;
    }

    setStatus("player-turn");
    setMessage("Cards are live. Hit or stand.");
  };

  const hit = () => {
    if (status !== "player-turn") return;

    const draw = drawCard(deck);
    if (!draw.card) return;

    const nextPlayerHand = [...playerHand, draw.card];
    setDeck(draw.deck);
    setPlayerHand(nextPlayerHand);

    if (getHandValue(nextPlayerHand) > 21) {
      setStatus("round-over");
      setMessage("You busted. Dealer takes the hand.");
    }
  };

  const stand = () => {
    if (status !== "player-turn") return;
    dealerPlay(deck, playerHand, dealerHand, chips);
  };

  const resetTable = () => {
    setDeck(shuffleDeck(createDeck()));
    setPlayerHand([]);
    setDealerHand([]);
    setStatus("betting");
    setChips(500);
    setBet(25);
    setMessage("Fresh table. Place a bet and deal.");
  };

  if (compact) {
    return (
      <div
        className={cn(
          "relative max-h-[calc(100vh-190px)] overflow-hidden rounded-[24px] border border-[#D7E2EA]/15 bg-[#0C0C0C] p-3 shadow-2xl shadow-black/25",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(39,196,168,0.22), transparent 34%), radial-gradient(circle at 75% 75%, rgba(248,184,78,0.12), transparent 30%), linear-gradient(135deg, rgba(12,12,12,0.96), rgba(11,43,36,0.86))",
          }}
        />
        <div className="relative grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#27C4A8]/35 bg-[#27C4A8]/10">
                <Trophy className="h-4 w-4 text-[#27C4A8]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/45">
                  Blackjack
                </p>
                <p className="text-base font-black uppercase leading-none text-[#D7E2EA]">
                  Table
                </p>
              </div>
            </div>
            <motion.p
              key={chips}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 rounded-full border border-[#D7E2EA]/15 bg-[#0C0C0C]/60 px-3 py-1 text-sm font-black text-[#D7E2EA]"
            >
              <Coins className="h-4 w-4 text-[#F8B84E]" aria-hidden="true" />
              {chips}
            </motion.p>
          </div>

          <HandView
            title="Dealer"
            hand={dealerHand}
            score={dealerScore}
            hideSecondCard={status === "player-turn"}
            compact
          />
          <HandView title="Player" hand={playerHand} score={playerScore} compact />

          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={cn(
                "min-h-[42px] rounded-2xl border px-3 py-2 text-xs font-light leading-relaxed",
                isWinMessage
                  ? "border-[#27C4A8]/35 bg-[#27C4A8]/10 text-[#D7E2EA]"
                  : isLossMessage
                    ? "border-[#E85D75]/35 bg-[#E85D75]/10 text-[#D7E2EA]"
                    : "border-[#D7E2EA]/10 bg-[#0C0C0C]/35 text-[#D7E2EA]/70",
              )}
            >
              {message}
            </motion.p>
          </AnimatePresence>

          {status !== "player-turn" && chips > 0 && (
            <div>
              <div className="flex items-center justify-between text-[0.58rem] font-medium uppercase tracking-widest text-[#D7E2EA]/45">
                <label htmlFor="blackjack-bet-compact">Wager</label>
                <span>{bet}</span>
              </div>
              <input
                id="blackjack-bet-compact"
                type="range"
                min={5}
                max={maxBet}
                step={5}
                value={Math.min(bet, maxBet)}
                onChange={(event) => updateBet(Number(event.target.value))}
                className="mt-1 w-full accent-[#27C4A8]"
              />
              <button
                type="button"
                onClick={goAllIn}
                className="mt-2 h-8 w-full rounded-full border border-[#F8B84E]/30 bg-[#F8B84E]/10 text-[0.68rem] font-semibold uppercase tracking-wider text-[#D7E2EA] transition hover:border-[#F8B84E]/60"
              >
                All In
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {status !== "player-turn" ? (
              <motion.button
                type="button"
                onClick={chips > 0 ? deal : resetTable}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="col-span-2 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D7E2EA] px-4 text-xs font-semibold uppercase tracking-wider text-[#0C0C0C]"
              >
                <Hand className="h-4 w-4" aria-hidden="true" />
                {chips > 0 ? "Deal" : "Reset Chips"}
              </motion.button>
            ) : (
              <>
                <motion.button
                  type="button"
                  onClick={hit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-10 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/10 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]"
                >
                  Hit
                </motion.button>
                <motion.button
                  type="button"
                  onClick={stand}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-10 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/10 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]"
                >
                  Stand
                </motion.button>
              </>
            )}
            <button
              type="button"
              onClick={resetTable}
              className="col-span-2 inline-flex h-8 items-center justify-center gap-2 rounded-full text-[0.68rem] font-semibold uppercase tracking-wider text-[#D7E2EA]/55 transition hover:text-[#D7E2EA]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-[#D7E2EA]/15 bg-[#0C0C0C] p-4 shadow-2xl shadow-black/25 sm:p-6 md:rounded-[44px]",
        compact && "rounded-[24px] p-3 md:rounded-[28px]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(39,196,168,0.22), transparent 34%), radial-gradient(circle at 75% 75%, rgba(248,184,78,0.12), transparent 30%), linear-gradient(135deg, rgba(12,12,12,0.96), rgba(11,43,36,0.86))",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[62%] w-[72%] -translate-x-1/2 rounded-full border border-[#D7E2EA]/10" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#27C4A8]/70 to-transparent" />
      <div
        className={cn(
          "relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]",
          compact && "gap-3 lg:grid-cols-1",
        )}
      >
        <div className={cn("grid gap-4", compact && "gap-3")}>
          <HandView
            title="Dealer"
            hand={dealerHand}
            score={dealerScore}
            hideSecondCard={status === "player-turn"}
            compact={compact}
          />
          <HandView title="Player" hand={playerHand} score={playerScore} compact={compact} />
        </div>

        <aside className={cn(
          "flex flex-col rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-4 backdrop-blur-md",
          compact && "p-3",
        )}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#27C4A8]/35 bg-[#27C4A8]/10">
              <Trophy className="h-5 w-5 text-[#27C4A8]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
                Blackjack
              </p>
              <p className="text-xl font-black uppercase leading-none text-[#D7E2EA]">
                Table
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={cn(
                "mt-5 min-h-[56px] rounded-2xl border px-3 py-2 text-sm font-light leading-relaxed",
                isWinMessage
                  ? "border-[#27C4A8]/35 bg-[#27C4A8]/10 text-[#D7E2EA]"
                  : isLossMessage
                    ? "border-[#E85D75]/35 bg-[#E85D75]/10 text-[#D7E2EA]"
                    : "border-[#D7E2EA]/10 bg-[#0C0C0C]/35 text-[#D7E2EA]/70",
              )}
            >
              {message}
            </motion.p>
          </AnimatePresence>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/70 p-3">
              <p className="text-[0.68rem] uppercase tracking-widest text-[#D7E2EA]/40">
                Chips
              </p>
              <motion.p
                key={chips}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="mt-1 flex items-center gap-2 text-2xl font-black text-[#D7E2EA]"
              >
                <Coins className="h-5 w-5 text-[#F8B84E]" aria-hidden="true" />
                {chips}
              </motion.p>
            </div>
            <div className="rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/70 p-3">
              <p className="text-[0.68rem] uppercase tracking-widest text-[#D7E2EA]/40">
                Bet
              </p>
              <p className="mt-1 text-2xl font-black text-[#D7E2EA]">{bet}</p>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="blackjack-bet"
              className="text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/45"
            >
              Wager
            </label>
            <input
              id="blackjack-bet"
              type="range"
              min={5}
              max={maxBet}
              step={5}
              value={Math.min(bet, maxBet)}
              disabled={status === "player-turn" || chips <= 0}
              onChange={(event) => updateBet(Number(event.target.value))}
              className="mt-3 w-full accent-[#27C4A8]"
            />
            <button
              type="button"
              onClick={goAllIn}
              disabled={status === "player-turn" || chips <= 0}
              className="mt-3 h-9 w-full rounded-full border border-[#F8B84E]/30 bg-[#F8B84E]/10 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA] transition hover:border-[#F8B84E]/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              All In
            </button>
          </div>

          <div className="mt-5 grid gap-2">
            {status !== "player-turn" ? (
              <motion.button
                type="button"
                onClick={chips > 0 ? deal : resetTable}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D7E2EA] px-5 text-sm font-semibold uppercase tracking-wider text-[#0C0C0C] transition hover:scale-[1.02]"
              >
                <Hand className="h-4 w-4" aria-hidden="true" />
                {chips > 0 ? "Deal" : "Reset Chips"}
              </motion.button>
            ) : (
              <div className="grid gap-2">
                <motion.button
                  type="button"
                  onClick={hit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-11 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/10 text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] transition hover:border-[#D7E2EA]/40"
                >
                  Hit
                </motion.button>
                <motion.button
                  type="button"
                  onClick={stand}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-11 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/10 text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] transition hover:border-[#D7E2EA]/40"
                >
                  Stand
                </motion.button>
              </div>
            )}

            <button
              type="button"
              onClick={resetTable}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 transition hover:text-[#D7E2EA]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset Table
            </button>
          </div>

          <p className={cn(
            "mt-auto pt-5 text-[0.68rem] font-light uppercase leading-relaxed tracking-wider text-[#D7E2EA]/35",
            compact && "pt-3",
          )}>
            Play-money only. Dealer stands on 17. Blackjack pays 3:2.
          </p>
        </aside>
      </div>
    </div>
  );
}
