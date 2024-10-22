import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
);

export const updateUserSchema = z.object({
  username: z.string().min(1).optional(),
  password: z
    .string()
    .regex(passwordValidation, {
      message:
        'Must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character and be at least 8 characters long',
    })
    .optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
