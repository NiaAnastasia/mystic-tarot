-- CreateEnum
CREATE TYPE "Arcana" AS ENUM ('MAJOR', 'MINOR');

-- CreateEnum
CREATE TYPE "Suit" AS ENUM ('WANDS', 'CUPS', 'SWORDS', 'PENTACLES');

-- CreateEnum
CREATE TYPE "SpreadType" AS ENUM ('THREE_CARD', 'CELTIC_CROSS', 'SINGLE', 'HORSESHOE');

-- CreateEnum
CREATE TYPE "PositionContext" AS ENUM ('PAST', 'PRESENT', 'FUTURE', 'SELF', 'SITUATION', 'ADVICE', 'OUTCOME', 'CHALLENGE', 'FOUNDATION', 'HOPES');

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "arcana" "Arcana" NOT NULL,
    "suit" "Suit",
    "number" INTEGER NOT NULL,
    "meaningUpright" JSONB NOT NULL,
    "meaningReversed" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "keywords" TEXT[],
    "deckId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardMeaning" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "positionContext" "PositionContext" NOT NULL,
    "meaningText" TEXT NOT NULL,

    CONSTRAINT "CardMeaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spreadType" "SpreadType" NOT NULL,
    "question" TEXT,
    "interpretation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingCard" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "isReversed" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ReadingCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deck_slug_key" ON "Deck"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardMeaning" ADD CONSTRAINT "CardMeaning_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingCard" ADD CONSTRAINT "ReadingCard_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingCard" ADD CONSTRAINT "ReadingCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
