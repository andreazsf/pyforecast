<template>
  <q-card flat class="q-ma-xl">
    <div class="col flex">
      <div
        class="fit column wrap justify-around"
        style="max-width: 32vw; min-height: 720px; min-width: 480px"
      >
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col">
            <q-card-section>
              <div class="q-mb-lg">
                <div class="flex">
                  <div
                    class="text-32 q-my-none text-primary q-mb-md text-weight-medium"
                  >
                    Sign in
                  </div>
                </div>
              </div>

              <q-form ref="form" @submit="submit" class="q-gutter-y-md text-16">
                <div>
                  <div class="text-grey-7 q-mb-sm">Email</div>
                  <q-input
                    borderless
                    v-model="user.email"
                    autocomplete="off"
                    placeholder="Enter your email address"
                    name="Email"
                    class="input-type q-px-lg"
                  />
                </div>

                <div class="q-pt-md q-mb-md">
                  <div class="row justify-between">
                    <div class="text-grey-7">Password</div>
                    <div class="row text-grey-7 cursor-pointer">
                      <q-icon name="visibility_off" size="xs" class="q-mr-xs" />
                      Hide
                    </div>
                  </div>
                  <q-input
                    borderless
                    v-model="user.password"
                    autocomplete="off"
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    class="input-type q-px-lg q-mt-sm"
                  />
                </div>
                <q-btn
                  unelevated
                  no-caps
                  class="btn-default q-py-md q-px-xl text-22"
                  color="primary"
                  label="Sign in"
                  type="submit"
                ></q-btn>

                <div
                  class="row q-mb-xl q-mt-sm text-black justify-between"
                  style="margin-left: -6px"
                >
                  <q-checkbox v-model="right" label="Remember me" size="sm" />
                  <div class="cursor-pointer q-mt-sm">Need help?</div>
                </div>

                <div class="fit row items-end text-grey-7 q-pt-lg">
                  <div class="self-end" style="text-wrap: wrap !important">
                    <div class="text-bold">Don't have an account yet?</div>
                    Ask your administrator to create one for you.
                    <!-- <router-link
                      class="text-primary text-bold q-ml-xs"
                      to="/register"
                      >Register using your email.</router-link
                    > -->
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import login from "../boot/firebase-login";

const user = reactive({
  email: null,
  password: null,
});

const form = ref(null);

const submit = async () => {
  if (form.value.validate()) {
    try {
      await login(user);
      router.push("/dashboard");
    } catch (err) {}
  }
};
</script>
