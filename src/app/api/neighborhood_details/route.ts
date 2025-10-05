
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/service/prisma";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id_neighborhood = searchParams.get("id_neighborhood");
    const anoInicio = Number(searchParams.get("anoInicio"));
    const anoFim = Number(searchParams.get("anoFim"));

    if (!id_neighborhood || isNaN(anoInicio) || isNaN(anoFim)) {
      return NextResponse.json(
        { error: "Parâmetros inválidos. Informe id_neighborhood, anoInicio e anoFim." },
        { status: 400 }
      );
    }

    const dados = await prisma.climate.findMany({
      where: {
        id_neighborhood,
        ano: {
          gte: anoInicio, // >= anoInicio
          lte: anoFim,    // <= anoFim
        },
      },
      orderBy: { ano: "asc" },
      select: {
        id: true,
        ano: true,
        temperature: true,
        ndvi: true,
        particles: true,
        neighborhood: {
          select: {
            id: true,
            nome: true,
            city: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(dados, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar dados climáticos:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}