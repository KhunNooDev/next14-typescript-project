import { NextRequest } from 'next/server'
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse'
import { accounts } from '../data'

// For getting data (filter)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const filter_accounts = accounts.filter(acc => acc.id.toString() === id)[0]
    console.log(filter_accounts)

    const data = {
      success: true,
      data: {
        accounts: filter_accounts,
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
