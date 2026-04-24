const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
        console.log('No users found. Please visit the /generate page while logged in first!');
        return;
    }

    const user = users[0];
    await prisma.user.update({
        where: { id: user.id },
        data: { tier: 'agency' }
    });

    console.log(`User ${user.email} successfully upgraded to AGENCY!`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
