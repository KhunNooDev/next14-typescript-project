import useSWR from 'swr'
import { apiUtils } from './apiUtils'
import { AxiosError } from 'axios'

// Define the response type for useAxiosSWR
export interface AxiosSWRResponse<T> {
  data: T
  error: AxiosError<unknown, any> | null
  isLoading: boolean
}

// Define the useAxiosSWR hook
export const useAxiosSWR = <T>(endpoint: string, params?: any): AxiosSWRResponse<T> => {
  const endpointWithParams = params ? `${endpoint}?${new URLSearchParams(params).toString()}` : endpoint

  const { data, error, isValidating } = useSWR<T>(endpointWithParams, apiUtils.getData)

  return {
    data: data as T, // Type assertion here
    error,
    isLoading: isValidating,
  }
}
