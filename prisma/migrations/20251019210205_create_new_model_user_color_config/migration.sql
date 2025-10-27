-- CreateTable
CREATE TABLE "userColorConfigs" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "actions" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "userColorConfigs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userColorConfigs" ADD CONSTRAINT "userColorConfigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
