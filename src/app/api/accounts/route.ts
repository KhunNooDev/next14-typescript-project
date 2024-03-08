import { NextRequest } from 'next/server'
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse'
import { accounts } from './data'

// For getting data (filter)
export async function GET(req: NextRequest) {
  try {
    const data = {
      success: true,
      data: {
        accounts: accounts,
        totalRecords: 10,
      },
    }
    return jsonResponse(data)
  } catch (error) {
    return errorResponse(error as ErrorType)
  }
  // finally {
  //   await prisma.$disconnect() // Close the Prisma client
  // }
}
