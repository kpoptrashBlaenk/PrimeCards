export function useProject() {
  const { $supabase } = useNuxtApp()

  const createProject = async (body: ProjectNewBody) => {
    const project = await $supabase.client
      .from('project')
      .insert([{ name: body.name, description: body.description }])
      .select()
      .single()

    if (project.error) throw project.error

    const version = await $supabase.client
      .from('project_version')
      .insert([{ project_id: project.data.project_id }])
      .select()
      .single()

    if (version.error) {
      await $supabase.client.from('project').delete().eq('project_id', project.data.project_id)
      throw version.error
    }

    return { ...project.data, ...version.data } as SupabaseProject
  }

  const isProjectDuplicate = async (name: string, user_id: string) => {
    if (!name) throw createError({ statusCode: 400, statusMessage: 'No name provided.' })

    const projects = await $supabase.client.from('project').select().eq('name', name).eq('user_id', user_id)

    if (projects.error) throw projects.error

    return projects.data.length > 0
  }

  const getProjects = async (user_id: string) => {
    if (!user_id) throw createError({ statusCode: 400, statusMessage: 'No user provided.' })

    const projects = await $supabase.client.rpc('get_user_projects', { user_id: user_id })

    if (projects.error) throw projects.error

    return projects.data as SupabaseProject[]
  }

  const getDevProject = async (project_id: string) => {
    return {}
    if (!project_id) throw createError({ statusCode: 400, statusMessage: 'No project provided.' })

    const project = await $supabase.client
      .from('project')
      .select('*, project_version(version_id, version, date)')
      .eq('project_id', project_id)
      .order('date', { ascending: false, referencedTable: 'project_version' })

    if (project.error) throw project.error

    if (project.data.length === 0) throw createError({ statusCode: 404, message: `Project not found.` })

    return project.data[0] as SupabaseProjectRow
  }

  return { createProject, isProjectDuplicate, getProjects, getDevProject }
}
