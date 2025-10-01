<template>
  <div>
    <div class="text-2xl pl-3">Tree View</div>
    <Tabs value="0">
      <!-- List -->
      <TabList class="bg-transparent" :pt="{ tabList: { class: 'bg-transparent' } }">
        <Tab value="0">Pages</Tab>
        <Tab value="1">Components</Tab>
      </TabList>

      <!-- Panels -->
      <TabPanels class="bg-transparent">
        <!-- Pages Panel -->
        <TabPanel value="0">
          <Button label="New Page" icon="pi pi-plus" variant="text" size="small"></Button>
          <Divider class="my-2" />

          <!-- Tree -->
          <Tree
            v-model:selectionKeys="selectedKey"
            :value="projectToNode(projectStore.project!.project_version.app)"
            selectionMode="single"
            :filter="true"
            filterBy="label"
            filterPlaceholder="Search"
            :pt="{ pcFilterInput: { name: 'filter' } }"
            class="bg-transparent -mt-2"
            @nodeSelect="projectStore.selectComponent($event)"
          >
            <template #default="slotProps">
              <div class="text-sm flex gap-2 align-items-center">
                <i class="text-sm" :class="`pi pi-${slotProps.node.data.icon}`"></i>
                {{ slotProps.node.data.name }}
              </div>
            </template>
          </Tree>
        </TabPanel>

        <!-- Component Panel -->
        <TabPanel value="1"></TabPanel>
      </TabPanels>
    </Tabs>
  </div>
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
function projectToNode(components: ProjectComponent[], key: string = '') {
  let nodes: TreeNode[] = []

  components.forEach((component, index) => {
    nodes.push({
      key: `${key}${index}`,
      label: component.name,
      data: component,
      children: component.children ? projectToNode(component.children, `${key}${index}-`) : [],
    })
  })

  return nodes
}
</script>
