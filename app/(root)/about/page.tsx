import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
    title: "WOLF1 - About",
    description: "about WOLF",
}

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return <div className="text-7xl font-mono opacity-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, commodi. Neque aperiam voluptates praesentium qui magnam non. Quam, fuga? Repellat mollitia totam, voluptatem pariatur tempora explicabo praesentium nostrum eos distinctio fugit voluptatum soluta cupiditate atque a voluptate magnam quis obcaecati possimus dignissimos assumenda delectus! Velit perferendis fugit ipsam. Adipisci, maxime.
    </div>
}

export default Page