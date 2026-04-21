const { z } = require("zod");






const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.issues?.map((e) => e.message) || [error.message],
    });
  }
};





const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
})






const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
})





const transformSchema = z.object({
  transformations: z.object({
    resize: z
      .object({
        width: z.number().min(1).max(5000),
        height: z.number().min(1).max(5000),
      })
      .optional(),
    crop: z
      .object({
        width: z.number().min(1),
        height: z.number().min(1),
        x: z.number().min(0),
        y: z.number().min(0),
      })
      .optional(),
    rotate: z.number().min(0).max(360).optional(),
    flip: z.boolean().optional(),
    mirror: z.boolean().optional(),
    format: z.enum(["jpeg", "png", "webp", "gif"]).optional(),
    compress: z
      .object({
        quality: z.number().min(1).max(100),
      })
      .optional(),
    filters: z
      .object({
        grayscale: z.boolean().optional(),
        sepia: z.boolean().optional(),
      })
      .optional(),
  }),
});




module.exports = { validate, registerSchema, loginSchema, transformSchema };