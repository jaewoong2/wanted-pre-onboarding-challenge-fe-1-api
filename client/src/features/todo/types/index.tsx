export type GetTodoListResponse = {
  data: {
    title: string
    content: string
    id: string
    createdAt: string
    updatedAt: string
  }[]
}

export type SetTodoList = {
  title: string
  token: string
  content: string
}
