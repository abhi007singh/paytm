const { z } = require('zod')

const validateSignup = (payload) => {
    const Signup = z.object({
        username: z.string().min(3).max(30).toLowerCase().trim(),
        firstname: z.string().max(50).trim(),
        lastname: z.string().max(50).trim(),
        password: z.string().min(6)
    });

    return Signup.safeParse(payload);
}

const validateSignin = (payload) => {
    const Signin = z.object({
        username: z.string().min(3).max(30).toLowerCase().trim(),
        password: z.string().min(6)
    });

    return Signin.safeParse(payload);
}

const validateUpdateUser = (payload) => {
    const UpdateUser = z.object({
        firstname: z.string().max(50).trim().optional(),
        lastname: z.string().max(50).trim().optional(),
        password: z.string().min(6).optional()
    });

    return UpdateUser.safeParse(payload);
}

module.exports = {
    validateSignup,
    validateSignin,
    validateUpdateUser
}