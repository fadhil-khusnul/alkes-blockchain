import prisma from "@/utils/prisma";

export default async function handler(req, res) {
        const { addressResponse } = req.query;

        
        console.log(addressResponse);

        try {
                const alkesProducts = await prisma.alkesProduct.findMany({
                        where: {
                                alkesAddr: addressResponse,
                        },
                });

                res.status(200).json(alkesProducts);
        } catch (error) {
                console.error('Error fetching AlkesProduct:', error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}