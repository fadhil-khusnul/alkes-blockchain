import prisma from "@/utils/prisma"

export async function POST(request) {
  try {

    const { txn } = await request.json();

    console.log(txn);

    const alkesToUpdate = await prisma.alkesProduct.findMany({
      where: {
        txnAddressPasien: txn,
      },
    });

    console.log(alkesToUpdate);



    for (let i = 0; i < alkesToUpdate.length; i++) {
      const alkes = alkesToUpdate[i];
      await prisma.alkesProduct.update({
        where: { id: alkes.id },
        data: {
          status: true,
        }, // Replace "your_updated_value" with the actual value you want to set
      });

    }

    return Response.json({
      status: 200,
      message: "Rows updated successfully.",
      alkesToUpdate: alkesToUpdate
    })


  } catch (error) {
    console.error("Error updating rows:", error);
    return {
      status: 500,
      error: "Internal Server Error",
    };

  }




}

