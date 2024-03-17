import { NextRequest } from 'next/server'
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse'
import prisma from '@/database/prismadb'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const acc = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    const data = {
      success: true,
      data: {
        accounts: acc,
      },
    }
    return jsonResponse(data)
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await prisma.$disconnect() // Close the Prisma client
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await req.json()

    const newData = await prisma.user.update({
      where: { id: params.id },
      data: {
        email: res.email,
        name: res.name,
      },
    })

    console.log(newData)

    const data = {
      success: true,
      data: newData,
    }

    return jsonResponse(data)
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await prisma.$disconnect() // Close the Prisma client
  }
}
