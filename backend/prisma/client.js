// src/prisma/client.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log(Object.keys(prisma));

export default prisma;