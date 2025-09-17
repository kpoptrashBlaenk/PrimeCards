import { useUserStore } from '@stores/user'
import z from 'zod'

const projectsNewGeneralSchema = z
  .object({
    name: z.string('Name must not be empty').min(1, 'Name must not be empty'),
    description: z.string().max(200, 'Description must not be longer than 200 characters').nullable(),
  })
  .superRefine(async (data, ctx) => {
    const userStore = useUserStore()
    const isDuplicate = await useProject().isProjectDuplicate(data.name, userStore.user!.user_id)

    if (isDuplicate) {
      ctx.addIssue({
        code: 'custom',
        path: ['name'],
        message: 'You already have a project with this name',
      })
    }
  })

export default projectsNewGeneralSchema
