import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { taskStatus } from "@prisma/client"
import { Request, Response } from "express"
import { string, z, ZodError } from "zod"

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      color: z.enum(["red", "blue", "green", "orange"], {
        message: "Escolha uma cor válida",
      }),
      status: z.enum(["pending", "completed"]).default("pending"),
    })

    const { title, description, color, status} = bodySchema.parse(
      request.body
    )

    const userId = request.user?.id

    if(!userId){
      throw new AppError("Usuário inválido", 404)
    }

    const userExists = await prisma.user.findFirst({ where: { id: userId } })

    if (!userExists) {
      throw new AppError("Usuário inexistente")
    }

    await prisma.tasks.create({
      data: {
        title,
        description,
        color,
        status,
        userId,
      },
    })

    response.status(201).json()
  }

  async update(request: Request, response: Response) {
    const bodySchema = z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        color: z
          .enum(["red", "blue", "green", "orange"], {
            message: "Escolha uma cor válida",
          })
          .optional(),
        status: z.enum(["pending", "completed"]).default("pending").optional(),
      })
      .refine((data) => Object.keys(data).length > 0, {
        message: "É necessário fornecer ao menos um campo para atualizar.",
      })

    const { title, description, color, status } = bodySchema.parse(request.body)
    const { id } = request.params
    const userId = request.user?.id
    const idExists = await prisma.tasks.findFirst({ where: { id,userId} })

    if (!idExists) {
      throw new AppError("Digite um id válido", 404)
    }

    await prisma.tasks.update({
      where: { id },
      data: {
        title,
        description,
        color,
        status,
      },
    })

    response.status(200).json()
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params
    const userId = request.user?.id
    const idExists = await prisma.tasks.findFirst({ where: { id: id } })

    if (!idExists) {
      throw new AppError("ID inválido", 404)
    }

    const task = await prisma.tasks.findFirst({
      where: {
        id: id,
        userId: request.user?.id,
      },
    }) 

    if (!task) {
      throw new AppError("Tarefa não encontrada não encontrada", 404)
    }

    await prisma.tasks.delete({ where: { id, userId } })

    response.status(200).json()
  }

  async index(request: Request, response: Response) {
    const userId = request.user?.id
    const { status, title } = request.query
    const where: any = { userId }

    if (status === "completed") {
      where.status = "completed"
    } else if (status === "pending") {
      where.status = "pending"
    }

    if (title) {
      where.title = {
        contains: String(title),
      }
    }

    const tasks = await prisma.tasks.findMany({ where })

    response.status(200).json(tasks)
  }

}

export { TasksController }
