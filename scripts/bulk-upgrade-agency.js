const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
        console.log('No users found in database.');
        return;
    }

    console.log(`Found ${users.length} users. Standardizing all to AGENCY...`);

    for (const user of users) {
        await prisma.user.update({
            where: { id: user.id },
            data: { tier: 'agency' }
        });
        console.log(`- ${user.email} -> AGENCY ✅`);
    }

    console.log('All users successfully upgraded!');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
