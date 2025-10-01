<template>
  <div>
    <Tabs value="0">
      <!-- List -->
      <TabList class="bg-transparent" :pt="{ tabList: { class: 'bg-transparent' } }">
        <Tab value="0">Pages</Tab>
        <Tab value="1">Components</Tab>
        <Tab value="2">Properties</Tab>
      </TabList>

      <!-- Panels -->
      <TabPanels class="bg-transparent px-1">
        <!-- Pages Panel -->
        <TabPanel value="0">
          <ProjectsEditTreePages />
        </TabPanel>

        <!-- Component Panel -->
        <TabPanel value="1">
          <ProjectsEditTreeComponents />
        </TabPanel>

        <!-- Properties Panel -->
        <TabPanel value="2">
          <ProjectsEditTreeProperties />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
