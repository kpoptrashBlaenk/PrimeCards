<template>
  <div>
    <Tabs value="0">
      <!-- List -->
      <TabList :pt="{ tabList: { class: 'bg-transparent m-0 p-0' } }">
        <Tab value="0">Pages</Tab>
        <Tab value="1">Components</Tab>
        <Tab value="2">Properties</Tab>
      </TabList>

      <!-- Panels -->
      <TabPanels class="bg-transparent p-0! pr-2!">
        <!-- Pages Panel -->
        <TabPanel value="0">
          <div>
            <projects-edit-tree-pages />
          </div>
        </TabPanel>

        <!-- Component Panel -->
        <TabPanel value="1">
          <div>
            <projects-edit-tree-components />
          </div>
        </TabPanel>

        <!-- Properties Panel -->
        <TabPanel value="2">
          <projects-edit-tree-properties />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
