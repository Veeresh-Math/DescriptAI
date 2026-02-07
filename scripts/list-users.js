const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log('--- Current Users in DB ---');
    console.table(users.map(u => ({
        id: u.id,
        email: u.email,
        tier: u.tier,
        short: u.shortCredits,
        medium: u.mediumCredits
    })));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
