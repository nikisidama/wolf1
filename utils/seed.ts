import prisma from "@/utils/db";
import bcrypt from "bcrypt";

export default async function seed() {
  if ((await prisma.user.count()) > 0) return;

  const password = await bcrypt.hash("password", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password,
      role: "ADMIN",
      profile: {
        create: {
          name: "Admin",
          bio: "Admin of the blog platform.",
        },
      },
      posts: {
        create: [
          {
            title: "Hello World",
            content: `<p style="text-align: center"><strong>Welcome to our blog! </strong></p><p style="text-align: center">This is your first step into exploring a world of knowledge and <span style="color: #ff0000"><em>inspiration</em></span>.</p>`,
            imageUrl: "",
          },
          {
            title: "Getting Started with Blogging",
            content: `<p style="text-align: right">Starting a blog is <span style="color: #00ffd5"><em>easier</em></span> than ever! Learn the basics and share your voice with the <span style="color: #ff0000"><strong>world</strong></span>.</p>`,
            imageUrl: "",
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "jane.doe@example.com",
      password,
      role: "USER",
      profile: {
        create: {
          name: "Jane Doe",
          bio: "Tech enthusiast and blogger.",
        },
      },
      posts: {
        create: [
          {
            title: "Exploring Nextjs",
            content: `<p><em>Nextjs</em> is a React framework for building lightning-fast web apps with server-side rendering and static site generation.</p>`,
            imageUrl: "https://www.0xkishan.com/_next/image?url=%2Fblogs%2Fnextjs%2Fhero.png&w=3840&q=75",
          },
          {
            title: "Why Tailwind CSS?",
            content: `<p><span style="color: #1dc0dc">Tailwind CSS simplifies styling with utility-first classes, making it easy to create beautiful, responsive designs.</span></p>`,
            imageUrl: "https://media.licdn.com/dms/image/D4D12AQHw9SjCddUhjQ/article-cover_image-shrink_720_1280/0/1715021638881?e=2147483647&v=beta&t=VuDjk7oMCOy2lSJtXjHerIg7QURxNCkcWdzUmfuVlu4",
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      password,
      role: "USER",
      profile: {
        create: {
          name: "John Doe",
          bio: "AI researcher and software engineer.",
        },
      },
      posts: {
        create: [
          {
            title: "Mastering Prisma",
            content: `<p><span style="color: #9ac0e5"><em>Prisma is an ORM that makes database management a breeze.</em></span> Learn how to connect your app to your database with ease.</p>`,
            imageUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fe8wccds3d6jqdrqssn2v.jpg",
          },
          {
            title: "The Hyperbolic Future of AI",
            content: `<p>AI is transforming the world in unexpected ways. Explore its <span style="color: #6a5feb"><strong>hyperbolic</strong></span> growth and impact on society.</p>`,
            imageUrl: "https://www.nftgators.com/wp-content/uploads/2024/07/Hyperbolic.jpg",
          },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}
