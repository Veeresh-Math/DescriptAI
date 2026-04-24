const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to create a test user...');
        const testId = 'test_' + Date.now();
        const user = await prisma.user.create({
            data: {
                id: testId,
                email: testId + '@example.com',
                tier: 'free',
                shortCredits: 3,
                mediumCredits: 2
            }
        });
        console.log('Test user created successfully:', user);

        // Clean up
        await prisma.user.delete({ where: { id: testId } });
        console.log('Test user cleaned up.');
    } catch (error) {
        console.error('FATAL DB ERROR:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
