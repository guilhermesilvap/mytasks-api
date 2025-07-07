import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { taskStatus } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      color: z.enum(["red", "blue", "green", "orange"], {
        message: "Escolha uma cor válida",
      }),
      status: z.enum(["pending", "completed"]).default("pending"),
      userId: z.string(),
    })

    const { title, description, color, status, userId } = bodySchema.parse(
      request.body
    )

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
    const bodySchema = z.object({
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
    message: 'É necessário fornecer ao menos um campo para atualizar.'
    })

    const { title, description, color, status } = bodySchema.parse(request.body)

    const { id } = request.params
    const idExists = await prisma.tasks.findFirst({ where: { id: id } })

    if (!idExists) {
      throw new AppError("Não há nenhuma task com este ID", 404)
    }

    await prisma.tasks.update({
      where: { id: id },
      data: {
        title,
        description,
        color,
        status,
      },
    })

    response.status(200).json()
  }

  async delete(request:Request, response:Response){

    const {id} = request.params

     const idExists = await prisma.tasks.findFirst({where:{id:id}})

     if(!idExists){
        throw new AppError("ID inválido",404)
     }

     await prisma.tasks.delete({where:{id:id}})

    response.status(200).json()
  }
}

export { TasksController }
