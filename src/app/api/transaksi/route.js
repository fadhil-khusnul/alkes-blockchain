import prisma from "@/utils/prisma";

export async function POST(req, res) {


  const { addressResponse, txn } = await req.json();
  console.log(addressResponse, txn);
  try {

    const products = await prisma.alkesProduct.findMany({
      where: {
        alkesAddr: addressResponse,
        txnAddressPasien: txn,
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
}
