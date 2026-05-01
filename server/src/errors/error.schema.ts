import { z } from "zod";

export const errorResponseSchema = z.object({
    code: z.string().uppercase(),
    errors: z.array(

        z.object({ 
            field: z.string().optional(), 
            message: z.string() 
        }) 

    )
});