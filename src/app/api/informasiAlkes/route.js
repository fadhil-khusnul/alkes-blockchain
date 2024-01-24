import prisma from "@/utils/prisma"

export async function POST(request) {

        const {
                
                nama_alkes,
                deskripsi_alkes,
                kategori_alkes,
                subkategori_alkes,
                klasifikasi,
                tipe_alkes,
                kelas_resiko,
                kuantitas,
                generatedIds,
                blockchain_address,
                
        } = await request.json()


        const informasiAlkes = await prisma.informasiAlkes.create({
                data: {
                        blockchain_address,
                        nama_alkes,
                        deskripsi_alkes,
                        kategori_alkes,
                        subkategori_alkes,
                        klasifikasi,
                        tipe_alkes,
                        kelas_resiko,
                        kuantitas,
                        generatedIds: {
                                create: generatedIds.map((id) => ({ generatedId: id })),
                        },
                },
        });
        if (!informasiAlkes)
                return Response.json({
                        status: 500,
                        isCreated: false
                })


        else
                return Response.json({
                        status: 200,
                        isCreated: true
                })


}