-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Prompt_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PromptToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PromptToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Prompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PromptToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Prompt_categoryId_idx" ON "Prompt"("categoryId");

-- CreateIndex
CREATE INDEX "Prompt_favorite_idx" ON "Prompt"("favorite");

-- CreateIndex
CREATE INDEX "Prompt_userId_idx" ON "Prompt"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PromptToTag_AB_unique" ON "_PromptToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PromptToTag_B_index" ON "_PromptToTag"("B");
