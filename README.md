# Blog Website  

A modern blogging platform built with **[Next.js](https://nextjs.org)**, **[Prisma](https://www.prisma.io/)**, **[Zod](https://zod.dev/)**, **[jose](https://www.npmjs.com/package/jose)**, **[shadcn/ui](https://ui.shadcn.com/)** **[TipTap](https://tiptap.dev/)** and the **[Hyperbolic API](https://hyperbolic.xyz/)**. This project allows users to create, read, update, and delete blog posts seamlessly, while integrating AI-powered text generation using the Hyperbolic API. 

---

## Features  

- **Authentication**:  
  - Secure user authentication and session management.  
- **Blog Management**:  
  - Create, edit, delete, and view blog posts.  
  - Rich-text editing powered by **Tiptap**.  
- **AI-Powered Content Creation**:  
  - Generate blog post content using the **Hyperbolic API**.  
- **Responsive Design**:  
  - Fully responsive UI for mobile, tablet, and desktop.  
- **Advanced Validations**:  
  - Strong input validation with **Zod** to ensure data integrity.  
- **Database Integration**:  
  - Seamless database operations with **Prisma** and SQLite.  
  
---

## Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/nikisidama/wolf1
   cd wolf1
   ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```
3. Set up environment variables:
    Create a `.env` file in the root directory with the following:
    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET_KEY="your-jwt-secret-key"
    HYPERBOLIC_API_KEY="your-hyperbolic-API-key"
    ```
4. Run Prisma migrations:
    ```bash
    pnpm prisma migrate dev
    ```
> **Note**: If no migrations exist, run pnpm prisma db push instead.
5. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## License
This project is licensed under the MIT License.

Feel free to contribute to this project by submitting a pull request or opening an issue!

```vbnet
This version is more polished and user-friendly. Let me know if you need further adjustments!
```