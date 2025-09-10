<template>
  <div>
    <SettingsTitle title="Account" context="title" />
    <Divider />
    <SettingsTitle title="Avatar" context="subtitle" :first="true" />
    <SettingsAccountAvatar />
    <SettingsTitle title="General" context="subtitle" />
    <SettingsAccountForm />
    <SettingsTitle title="Email" context="subtitle" />
    <SettingsAccountEmailForm />
    <Toast />
  </div>
</template>
