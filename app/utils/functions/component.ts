import ProjectsEditComponentsPage from '@components/projects/edit/components/Page.vue'
import ProjectsEditComponentsText from '@components/projects/edit/components/Text.vue'

export function getComponent(type: string) {
  switch (type) {
    case 'text':
      return ProjectsEditComponentsText
    case 'page':
      return ProjectsEditComponentsPage
    default:
      return 'div'
  }
}
