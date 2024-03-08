import { NextRequest } from 'next/server'
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse'

export type UserData = {
  id: number
  name: string
  age: number
  email: string
  profession: string
}

// For getting data (filter)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log(params.id)

    const accounts: UserData[] = [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', profession: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', profession: 'Data Analyst' },
      { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', profession: 'Project Manager' },
      { id: 4, name: 'Alice Johnson', age: 35, email: 'alice@example.com', profession: 'Product Designer' },
      { id: 5, name: 'Michael Brown', age: 28, email: 'michael@example.com', profession: 'Marketing Specialist' },
      { id: 6, name: 'Emily Davis', age: 33, email: 'emily@example.com', profession: 'Financial Analyst' },
      { id: 7, name: 'Daniel Wilson', age: 45, email: 'daniel@example.com', profession: 'Business Consultant' },
      { id: 8, name: 'Sarah Taylor', age: 29, email: 'sarah@example.com', profession: 'HR Manager' },
      { id: 9, name: 'Chris Anderson', age: 32, email: 'chris@example.com', profession: 'Sales Executive' },
      { id: 10, name: 'Jessica Clark', age: 27, email: 'jessica@example.com', profession: 'Graphic Designer' },
    ]
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
