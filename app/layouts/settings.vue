<template>
  <NavbarMenubar />
  <div class="grid container-xl px-2">
    <div class="col-12 md:col-5 lg:col-4 xl:col-3">
      <SettingsSidebar />
    </div>

    <div class="col-12 md:col-7 lg:col-8 xl:col-9">
      <slot></slot>
    </div>
  </div>
</template>
