const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Successfully connected to database!');
    } catch (e) {
        console.error('Connection failed:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
