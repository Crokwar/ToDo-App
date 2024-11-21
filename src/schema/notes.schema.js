import { z } from 'zod'

export const createSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    description: z.string({
        required_error: 'Description is required',
    }),
    tags: z.string({
        required_error: 'Tags is required',
    }),
    due_date: z.string().date().optional(),
    image_url: z.string().optional(),
});