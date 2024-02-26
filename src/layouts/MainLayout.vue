<template>
  <q-layout view="lHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="q__toolbar">
        <!-- BTN to toggle left menu on mobile -->
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm mobile-only"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.xs"
          shrink
          class="row items-center no-wrap hidden"
        >
          <img src="" />
          <span class="q-ml-sm">PyForecast</span>
        </q-toolbar-title>

        <q-space />

        <q-input
          class="q__toolbar-input"
          borderless
          dense
          v-model="search"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
          <template v-slot:append>
            <q-btn flat dense round aria-label="Menu" icon="arrow_drop_down">
              <q-menu anchor="bottom end" self="top end">
                <div class="q-pa-md" style="width: 400px">
                  <div class="text-body2 text-grey q-mb-md">
                    Narrow your search results
                  </div>

                  <div class="row items-center">
                    <div class="col-3 text-subtitle2 text-grey">
                      Exact phrase
                    </div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="exactPhrase" />
                    </div>

                    <div class="col-3 text-subtitle2 text-grey">Has words</div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="hasWords" />
                    </div>

                    <div class="col-3 text-subtitle2 text-grey">
                      Exclude words
                    </div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="excludeWords" />
                    </div>

                    <div class="col-3 text-subtitle2 text-grey">Website</div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="byWebsite" />
                    </div>

                    <div class="col-12 q-pt-lg row justify-end">
                      <q-btn
                        flat
                        dense
                        no-caps
                        color="grey-7"
                        size="md"
                        style="min-width: 68px"
                        label="Search"
                        v-close-popup
                      />
                      <q-btn
                        flat
                        dense
                        no-caps
                        color="grey-7"
                        size="md"
                        style="min-width: 68px"
                        @click="onClear"
                        label="Clear"
                        v-close-popup
                      />
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </template>
        </q-input>

        <!-- <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="text-grey-7"
            icon="apps"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list
          padding
          class="text-grey-8 wrap column q-pa-lg q-gutter-y-md"
          style="min-height: 100vh"
        >
          <q-item clickable class="my-list">
            <q-item-section top avatar>
              <q-avatar size="md">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label style="margin-left: -8px !important">
                Jane Doe
              </q-item-label>
              <q-item-label style="margin-left: -8px !important" caption>
                admin@admin.com
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            class="q__drawer-item my-list"
            v-for="link in links1"
            :key="link.text"
            @click="router.push({ path: link.path })"
            :active="linkActive === 'link.path'"
            active-class="my-active-list"
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" class="material-symbols-outlined" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm hidden" />

          <q-space />

          <q-item
            class="q__drawer-item items-end items-center"
            v-ripple
            clickable
            @click="logout"
          >
            <!-- <q-item-section>
              <q-item-label
                >{{ link.text }} <q-icon v-if="link.icon" :name="link.icon"
              /></q-item-label>
            </q-item-section> -->
            <!-- <q-item-section avatar>
              <q-icon :name="link.icon" class="material-symbols-outlined" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section> -->
            <q-item-section avatar>
              <q-icon name="logout" class="material-symbols-outlined" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="q__drawer-item items-end items-center"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon name="light_mode" class="material-symbols-outlined" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Light mode</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import signout from "src/boot/firebase-signout";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const leftDrawerOpen = ref(false);
const search = ref("");
const showAdvanced = ref(false);
const showDateOptions = ref(false);
const exactPhrase = ref("");
const hasWords = ref("");
const excludeWords = ref("");
const byWebsite = ref("");
const byDate = ref("Any time");

function onClear() {
  exactPhrase.value = "";
  hasWords.value = "";
  excludeWords.value = "";
  byWebsite.value = "";
  byDate.value = "Any time";
}

function changeDate(option) {
  byDate.value = option;
  showDateOptions.value = false;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logout = () => {
  signout().then(() => {
    router.push("/login");
  });
};

const links1 = [
  { icon: "home", text: "Dashboard", path: "/dashboard" },
  { icon: "group", text: "Accounts", path: "/accounts-mgmt" },
  { icon: "currency_ruble", text: "Sales", path: "/sales-mgmt" },
  { icon: "inventory", text: "Inventory", path: "/books-inventory-mgmt" },
  { icon: "query_stats", text: "Forecasting" },
];

const linkActive = ref("dashboard");
// console.log(linkActive);
</script>

<style lang="sass">
.q

  &__toolbar
    height: 64px

  &__toolbar-input
    // width: 55%
    width: 20%
    border-radius: 12px
    background-color: #f5f5f5
    padding: 2px 8px
    font-size: 16px
    margin-top: 16px !important
    margin-right: 8px

  &__toolbar-input:active
    background-color: transparent !important

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: 16px !important
      // font-weight: 500
      line-height: 1.25rem

    // &:hover
    //   color: #000

  // &__drawer-item:hover
  //   border-radius: 12px !important

  &__drawer-item:active
    color: $primary !important
    border-left: 2px solid $primary
</style>
