import prisma from "@/utils/prisma"

export async function POST(request) {
  try {
    const { alkesAddr, arrayId, time } = await request.json();

    // const createdAt = new Date(time * 1000);

    console.log(alkesAddr, arrayId, time);
    const createAlkesProduct = async (generatedId) => {
      await prisma.alkesProduct.create({
        data: {
          alkesAddr,
          generatedId,
          createdAt : new Date(time * 1000),
        },
      });
    };

    await Promise.all(arrayId.map(({ id_produk }) => createAlkesProduct(id_produk)));

    return Response.json({
      status: 200,
      message: "Created successfully.",
    })
  } catch (error) {
    console.error("Error:", error);

    return Response.json({
      status: 500,
      error: error,
    })
  }



}

