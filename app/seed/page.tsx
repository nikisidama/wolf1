import seed from "@/utils/seed"

export default async function Seed() {
    await seed();
    return <>
        Seeding complete!
    </>
}
