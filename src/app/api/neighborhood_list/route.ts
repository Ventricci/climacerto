
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/service/prisma";


export async function GET() {

    try {

       
        console.log("Buscando...");
        const neighborhood_list = await prisma.neighborhood.findMany({
            select: {
                id: true,
                nome: true,
                climate: {
                    orderBy: {
                        ano: 'desc', // pega o mais recente
                    },
                    take: 1,       // só o último registro
                    select: {
                        temperature: true,
                        ano: true,
                        ndvi: true,
                        particles: true
                    },
                },
            },
        });



        return NextResponse.json({ success: true, neighborhood_list })



    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            {
                success: false,
                error: err.message.toString
            },
            {
                status: 500
            }

        )
    }



}