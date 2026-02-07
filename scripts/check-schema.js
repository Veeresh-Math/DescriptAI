const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.findFirst();
        console.log('--- Database schema check ---');
        if (user) {
            console.log('Sample user found:', user);
            console.log('shortCredits:', user.shortCredits);
            console.log('mediumCredits:', user.mediumCredits);
        } else {
            console.log('No users yet, but connection works.');
        }
    } catch (error) {
        console.error('Schema Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
