<template>
  <Button label="New Page" icon="pi pi-plus" variant="text" size="small" @click="projectStore.createPage()"></Button>
  <Divider class="my-2" />

  <!-- Tree -->
  <Tree
    v-model:selection-keys="selectedKey"
    :value="projectToNode(projectStore.project!.project_version.app, true)"
    selection-mode="single"
    :filter="true"
    filter-by="label"
    filter-placeholder="Search"
    :pt="{ pcFilterInput: { name: 'filter' } }"
    class="bg-transparent -mt-2 px-0"
    @ode-select="projectStore.selectComponent($event)"
  >
    <template #default="slotProps">
      <div class="text-sm flex gap-2 align-items-center">
        <i class="text-sm" :class="`pi pi-${slotProps.node.data.icon}`"></i>
        {{ slotProps.node.data.name }}
      </div>
    </template>
  </Tree>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Refs */
const selectedKey = ref({ '0': true })

/* Watches */
watch(
  selectedKey,
  (newValue, oldValue) => {
    if (Object.values(newValue).length === 0) selectedKey.value = oldValue
  },
  { deep: true },
)

/* Stores */
const projectStore = useProjectStore()

/* Functions */
function projectToNode(allComponents: ProjectComponent[], root: boolean, key: string = '') {
  const components = root ? allComponents.filter((component) => component.parentId === -1) : allComponents

  let nodes: TreeNode[] = []

  components.forEach((component, index) => {
    const children = projectStore.findChildren(component.id)

    nodes.push({
      key: `${key}${index}`,
      label: component.name,
      data: component,
      children: children ? projectToNode(children, false, `${key}${index}-`) : [],
    })
  })

  return nodes
}
</script>
