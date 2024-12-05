import prisma from "@/utils/db"
import bcrypt from "bcrypt"

export default async function seed() {
    if ((await prisma.user.count()) > 0) return;

    const password = await bcrypt.hash("password", 10);
    const users = await prisma.user.create({
        data: {
            email: "admin@wolf.com",
            password,
            role: "ADMIN",
            profile: {
                create: {
                  name: "Admin",
                  bio: "Hello world!",
                },
              },
            posts: {
                create: [
                    {
                        title: 'Hello World!',
                        content: 'Lorem ipsum dol epturi! Fugit numquam, veritatis cumque nobis minima at. Deserunt, vel eum!',            
                    },
                ],
            },
        },
    });

    console.log(users)
}

export async function seedPost() {
    const newPost = await prisma.post.create({
        data: {
            title: 'Hello World',
            content: 'Lorem ipsum dol epturi! Fugit numquam, veritatis cumque nobis minima at. Deserunt, vel eum!',
            userId: 1, 
        },
    });
    console.log(newPost)
}
