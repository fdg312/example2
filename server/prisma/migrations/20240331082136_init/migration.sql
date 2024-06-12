-- CreateTable
CREATE TABLE "_AddToFavourite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddToFavourite_AB_unique" ON "_AddToFavourite"("A", "B");

-- CreateIndex
CREATE INDEX "_AddToFavourite_B_index" ON "_AddToFavourite"("B");

-- AddForeignKey
ALTER TABLE "_AddToFavourite" ADD CONSTRAINT "_AddToFavourite_A_fkey" FOREIGN KEY ("A") REFERENCES "Add"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddToFavourite" ADD CONSTRAINT "_AddToFavourite_B_fkey" FOREIGN KEY ("B") REFERENCES "Favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
