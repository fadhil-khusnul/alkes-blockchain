import prisma from "@/utils/prisma";

export default async function handler(req, res) {
        const { alkesAddr } = await req.query;


        // const { alkesAddr } = await req.json();

        console.log(alkesAddr);

        
        // if (req.method !== 'GET') {
        //         return res.status(405).json({ message: 'Method Not Allowed' });
        // }

        // try {
        //         const { alkesAddr } = req.query;

        //         const alkesProducts = await prisma.alkesProduct.findMany({
        //                 where: {
        //                         alkesAddr,
        //                 },
        //         });

        //         res.status(200).json(alkesProducts);
        // } catch (error) {
        //         console.error('Error fetching AlkesProducts:', error);
        //         res.status(500).json({ message: 'Internal Server Error' });
        // }
}