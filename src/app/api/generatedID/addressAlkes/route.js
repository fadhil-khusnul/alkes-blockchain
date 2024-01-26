import prisma from "@/utils/prisma"

export async function POST(request) {
  try {

    const { addressAlkes, account, count } = await request.json();

    console.log(addressAlkes, count);

    const alkesToUpdate = await prisma.alkesProduct.findMany({
      where: {
        alkesAddr: addressAlkes,
        pasienAddr: null,
        updatedAt: null,
        status: false,
      },
    });



    for (let i = 0; i < count; i++) {
      const alkes = alkesToUpdate[i];
      await prisma.alkesProduct.update({
        where: { id: alkes.id },
        data: { 
          pasienAddr: account, 
          status: true,
          updatedAt : new Date() 
        }, // Replace "your_updated_value" with the actual value you want to set
      });

    }

    return Response.json({
      status: 200,
      message: "Rows updated successfully.",
      alkesToUpdate :alkesToUpdate
    })

   
  } catch (error) {
    console.error("Error updating rows:", error);
    return {
      status: 500,
      error: "Internal Server Error",
    };

  }




}

