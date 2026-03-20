import { AxiosError } from "axios"

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("")
}

export function extractErrorMessage(error: unknown, fallback: string): string {
  if (
    error instanceof AxiosError &&
    error.response?.data?.message
  ) {
    return error.response.data.message as string
  }
  return fallback
}
