import { NextRequest } from 'next/server'
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse'
import { accounts } from './data'
import prisma from '@/database/prismadb'
import { selectAll } from '@/database/actions'
import { apiUtils } from '@/utils/apiUtils'

// For getting data (filter)
export async function GET(req: NextRequest) {
  try {
    const { page, pageSize } = (await apiUtils.getParams(req)) as {
      page: number
      pageSize: number
    }

    console.log(page)
    console.log(pageSize)
    // const pageSize = 10
    const skip = (page - 1) * pageSize
    const acc = await prisma.user.findMany({
      skip,
      take: pageSize,
    })
    // const acc = await selectAll('user', {
    //   skip,
    //   take: pageSize,
    // })
    const totalCount = await prisma.user.count()

    const data = {
      success: true,
      data: {
        accounts: acc, // accounts,
        totalRecords: totalCount, // 10,
      },
    }
    return jsonResponse(data)
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await prisma.$disconnect() // Close the Prisma client
  }
}
