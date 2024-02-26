<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <q-page class="flex flex-center bg-white">
      <q-scroll-area class="absolute full-width full-height">
        <div class="full-width q-px-lg" style="min-height: 90vh">
          <div flat>
            <div class="text-h3">Welcome, Admin!</div>
            <p class="text-grey-6 q-mt-sm">
              Here's your summary sales of data.
            </p>
          </div>
          <div class="row q-gutter-x-md q-pt-md justify-center">
            <q-card
              clickable
              flat
              class="my-card bg-grey-2 rounded-borders clickable"
            >
              <q-card-section>
                <div class="text-subtitle2 text-primary">Books</div>
                <div class="text-h6">30,000</div>
                <q-item-label caption class="text-right">
                  <q-icon
                    name="import_contacts"
                    class="material-symbols-outlined"
                    size="xs"
                  />
                </q-item-label>
              </q-card-section>
            </q-card>
            <q-card
              clickable
              flat
              class="my-card bg-grey-2 rounded-borders clickable"
            >
              <q-card-section>
                <div class="text-subtitle2 text-primary">Uniform</div>
                <div class="text-h6">15,000</div>
                <q-item-label caption class="text-right">
                  <q-icon
                    name="checkroom"
                    class="material-symbols-outlined"
                    size="xs"
                  />
                </q-item-label>
              </q-card-section>
            </q-card>
            <q-card
              clickable
              flat
              class="my-card bg-grey-2 rounded-borders clickable"
            >
              <q-card-section>
                <div class="text-subtitle2 text-primary">Pajah</div>
                <div class="text-h6">25,000</div>
                <q-item-label caption class="text-right">
                  <q-icon
                    name="school"
                    class="material-symbols-outlined"
                    size="xs"
                  />
                </q-item-label>
              </q-card-section>
            </q-card>
            <q-card
              clickable
              flat
              class="bg-grey-2 rounded-borders clickable"
              style="min-width: 120px"
            >
              <q-card-section>
                <div class="text-subtitle2 text-primary">Other</div>
                <div class="text-h6 text-transparent">.</div>
                <q-item-label caption class="text-right">
                  <q-icon
                    name="add"
                    class="material-symbols-outlined"
                    size="xs"
                  />
                </q-item-label>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </q-page>
  </transition>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "DashBoard",
});
</script>
