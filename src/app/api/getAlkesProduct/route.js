import prisma from "@/utils/prisma";

export async function POST(req, res) {


        const { addressResponse } = await req.json();
        console.log(addressResponse);
        try {
             
                const products = await prisma.alkesProduct.findMany({
                        where: {
                                alkesAddr: addressResponse,
                        },
                });

                console.log(products);

                return Response.json({
                        status: 200,
                        products: products
                })

                // res.status(200).json(products);
        } catch (error) {
                console.error('Error fetching AlkesProducts:', error);
                res.status(500).json({ error: 'Internal Server Error' });
        }

        // try {
        //         const products = await prisma.alkesProduct.findMany({
        //                 where: {
        //                         alkesAddr: addressResponse,
        //                 },
        //         });

        //         console.log(products);
        //         res.status(200).json(products);
        // } catch (error) {
        //         console.error('Error fetching AlkesProducts:', error);
        //         res.status(500).json({ error: 'Internal Server Error' });
        // }
}

// export default async function handler(req, res) {
//         if (req.method === 'POST') {
//                 try {
//                         const { addressResponse } = req.body;

//                         console.log(addressResponse);

//                         const products = await prisma.alkesProduct.findMany({
//                                 where: {
//                                         alkesAddr: addressResponse,
//                                 },
//                         });

//                         res.status(200).json(products);
//                 } catch (error) {
//                         console.error('Error fetching AlkesProducts:', error);
//                         res.status(500).json({ error: 'Internal Server Error' });
//                 }
//         } else {
//                 res.status(405).json({ error: 'Method Not Allowed' });
//         }
// }