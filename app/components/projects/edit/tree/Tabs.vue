<template>
  <div>
    <Tabs value="0">
      <!-- List -->
      <TabList :pt="{ tabList: { class: 'bg-transparent' } }">
        <Tab value="0">Pages</Tab>
        <Tab value="1">Components</Tab>
        <Tab value="2">Properties</Tab>
      </TabList>

      <!-- Panels -->
      <TabPanels class="bg-transparent p-0">
        <!-- Pages Panel -->
        <TabPanel value="0">
          <div class="p-2">
            <ProjectsEditTreePages />
          </div>
        </TabPanel>

        <!-- Component Panel -->
        <TabPanel value="1">
          <div class="p-2">
            <ProjectsEditTreeComponents />
          </div>
        </TabPanel>

        <!-- Properties Panel -->
        <TabPanel value="2">
          <ProjectsEditTreeProperties />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
