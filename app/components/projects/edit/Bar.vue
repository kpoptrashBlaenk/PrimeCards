<template>
  <Menubar class="surface-50 border-1 border-200">
    <template #end>
      <div class="flex gap-3">
        <Button
          label="Play"
          icon="pi pi-play-circle"
          variant="outlined"
          size="small"
          :pt="{ label: { class: 'font-bold' } }"
          @click=""
        ></Button>

        <Button
          label="Save"
          icon="pi pi-save"
          variant="outlined"
          size="small"
          severity="success"
          :pt="{ label: { class: 'font-bold' } }"
          @click=""
        ></Button>

        <Button
          label="Publish"
          icon="pi pi-cloud-upload"
          variant="outlined"
          size="small"
          severity="warn"
          :pt="{ label: { class: 'font-bold' } }"
          @click=""
        ></Button>
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts"></script>
