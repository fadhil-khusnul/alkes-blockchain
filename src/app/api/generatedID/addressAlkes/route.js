import prisma from "@/utils/prisma"

export async function POST(request) {
  try {

    const { addressAlkes, account, count, txnAddress, txnTime } = await request.json();

    console.log(addressAlkes, count, txnAddress, txnTime);

    const alkesToUpdate = await prisma.alkesProduct.findMany({
      where: {
        alkesAddr: addressAlkes,
        pasienAddr: null,
        txnAddressPasien: null,
        updatedAt: null,
      },
    });



    for (let i = 0; i < count; i++) {
      const alkes = alkesToUpdate[i];
      await prisma.alkesProduct.update({
        where: { id: alkes.id },
        data: { 
          pasienAddr: account, 
          txnAddressPasien : txnAddress,
          // status: true,
          updatedAt : new Date(txnTime * 1000) 
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

