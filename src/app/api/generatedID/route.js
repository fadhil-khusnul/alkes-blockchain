import prisma from "@/utils/prisma"

export async function POST(request) {

   

        try {
                const { alkesAddr, arrayId } = await request.json();
                const createAlkesProduct = async (generatedId) => {
                        await prisma.alkesProduct.create({
                                data: {
                                        alkesAddr,
                                        generatedId,
                                },
                        });
                };

                await Promise.all(arrayId.map(({ id_produk }) => createAlkesProduct(id_produk)));


                res.status(200).json({ success: true });
        } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ success: false, error: "Internal Server Error" });
        }



}

