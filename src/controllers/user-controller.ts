import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { z } from "zod"
import { hash } from "bcrypt"

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "nome é obrigatório" }),
      email: z
        .string()
        .trim()
        .email({ message: "e-mail inválido" })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: "A senha deve ter no mínimo 6 dígitos" }),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if (userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse e-mail")
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    response.status(201).json()
  }
}

export { UserController }
