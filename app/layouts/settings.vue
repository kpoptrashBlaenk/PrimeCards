<template>
  <NavbarMenubar />
  <div class="grid container px-2">
    <div class="col-12 md:col-4 md:px-8">
      <SettingsSidebar />
    </div>

    <div class="col-12 md:col-8">
      <slot></slot>
    </div>
  </div>
</template>
