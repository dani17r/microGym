<script setup lang="ts">
import useAuthStore from "@store/auth/user.ts";
import { useQuasar } from "quasar";
import { reactive, ref } from "vue";

const authStore = useAuthStore();
const { notify } = useQuasar();

const form = reactive({
  email: {
    val: "dan@gmail.com",
    ref: ref(),
    rules: [
      (val: string | any[]) =>
        (val && val.length > 0) || "Please type something",
    ],
    hasError: () => form.email.ref.value?.hasError,
    validate: () => form.email.ref.value?.validate(),
  },
  password: {
    val: "12345",
    view: true,
    ref: ref(),
    hasError: () => form.password.ref.value?.hasError,
    validate: () => form.password.ref.value?.validate(),
  },
});

const onSubmit = () => {
  form.email.validate();
  form.password.validate();

  if (!form.email.hasError() || !form.password.hasError()) {
    authStore
      .login(form.email.val, form.password.val)
      .then(() => {
        notify({
          icon: "done",
          color: "positive",
          message: "Inicio de session correcto.",
        });
      })
      .catch(() => {
        notify({
          icon: "error",
          color: "negative",
          message: "Credenciales incorrectas.",
        });
      });
  }
};

const onReset = () => {
  form.email.val = "";
  form.password.val = "";

  form.email.ref.value?.resetValidation();
  form.password.ref.value?.resetValidation();
};
</script>

<template>
  <main class="row items-center justify-center h-[80vh]">
    <div class="q-pa-md w-[450px]">
      <h2 class="text-5xl pb-5">User login</h2>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          :ref="(e) => (form.email.ref = e)"
          filled
          v-model="form.email.val"
          label="Your email *"
          hint="Email"
          lazy-rules
          :rules="form.email.rules"
        />

        <q-input
          v-model="form.password.val"
          filled
          :type="form.password.view ? 'password' : 'text'"
          hint="Password with toggle"
          :ref="(e) => (form.password.ref = e)"
        >
          <template v-slot:append>
            <q-icon
              :name="form.password.view ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="form.password.view = !form.password.view"
            />
          </template>
        </q-input>

        <div class="mt-8">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </main>
</template>
