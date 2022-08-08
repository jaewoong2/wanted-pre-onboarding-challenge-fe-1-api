export type TodoData = {
  data: {
    title: string
    content: string
    id: string
    createdAt: string
    updatedAt: string
  }
}

export type GetTodoListResponse = {
  data: TodoData['data'][]
}

export type SetTodoList = {
  title: string
  token: string
  content: string
}
