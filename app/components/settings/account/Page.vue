<template>
  <div>
    <SettingsTitle title="Account" context="title" />
    <Divider />
    <SettingsTitle title="Avatar" context="subtitle" :first="true" />
    <SettingsAccountAvatar />
    <SettingsTitle title="General" context="subtitle" />
    <SettingsAccountForm />
    <SettingsTitle title="Change Email" context="subtitle" />
    <SettingsAccountEmailForm />
    <SettingsTitle title="Change Password" context="subtitle" />
    <SettingsAccountPasswordForm />
    <SettingsTitle title="Delete Account" context="subtitle" />
    <SettingsAccountDelete />
    <Toast />
  </div>
</template>
