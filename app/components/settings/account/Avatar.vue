<template>
  <Avatar
    icon="pi pi-user"
    shape="circle"
    class="bg-primary avatar-giant"
    :pt="{
      icon: { class: 'avatar-giant-icon' },
    }"
  />
  <FileUpload
    url="''"
    mode="basic"
    accept="image/*"
    :auto="true"
    :maxFileSize="1000000"
    invalidFileSizeMessage="File can't be bigger than 1Mb"
    chooseIcon="pi pi-upload"
    :chooseButtonProps="{ size: 'small', label: 'Upload' }"
    class="absolute ml-8 mb-2 p-1 surface-0 text-primary"
  />
</template>
