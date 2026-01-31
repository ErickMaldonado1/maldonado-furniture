import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const AuthService = {
  async register(data: any) {
    const { name, email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
  },

  async validateUser(credentials: any) {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });
    if (!user) throw new Error("Usuario no registrado");
    if (!user.password) {
      throw new Error(
        "Este usuario no tiene una contraseña establecida. Intenta iniciar sesión con Google.",
      );
    }
    const isValid = await bcrypt.compare(credentials.password, user.password);

    if (!isValid) throw new Error("Contraseña incorrecta");

    return user;
  },
};
