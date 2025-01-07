/*
  Warnings:

  - A unique constraint covering the columns `[youtubeId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Stream_youtubeId_key" ON "Stream"("youtubeId");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("googleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("youtubeId") ON DELETE RESTRICT ON UPDATE CASCADE;
