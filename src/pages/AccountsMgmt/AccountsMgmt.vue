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
          <!-- Heading -->
          <div>
            <div class="text-h3">Accounts</div>
            <p class="text-grey-6 q-mt-sm">Manage and create accounts here.</p>
          </div>

          <!-- Accounts Table -->
          <div
            class="items-center text-16 q-pa-lg my-bg-accent-0 rounded-borders"
          >
            <q-list class="q-gutter-x-lg my-text-accent-2 q-mb-lg row">
              <!-- <q-item
                class="row"
                :class="
                  $q.screen.width <= 414 ? 'full-width justify-center' : ''
                "
              > -->
              <q-item
                clickable
                :active="link === 'admins'"
                @click="link = 'admins'"
                active-class="my-active-link"
                class="my-link"
              >
                Administrators
              </q-item>
              <q-item
                clickable
                :active="link === 'staff'"
                @click="link = 'staff'"
                active-class="my-active-link"
                class="my-link"
              >
                Staff
              </q-item>
              <!-- </q-item> -->
              <q-item
                :class="
                  $q.screen.width <= 414
                    ? 'row full-width justify-center'
                    : 'justify-end'
                "
                class="col"
              >
                <q-btn
                  no-caps
                  flat
                  icon="person"
                  class="bg-primary text-white text-weight-regular rounded-borders-10"
                  style="line-height: 1.2"
                  label="Add a new account"
                  ><div class="gt-md q-pr-sm"></div>
                </q-btn>
              </q-item>
            </q-list>
            <q-table
              :rows="currentRows"
              :columns="columns"
              :rows-per-page-options="[0]"
              @row-click="onRowClick"
              row-key="id"
              class="my-table my-table-row-width q-mx-md"
              flat
            >
              <!-- More actions -->
              <template v-slot:body-cell-actions="props">
                <q-td
                  :props="props"
                  style="padding-right: 16px"
                  class="text-right"
                >
                  <q-btn
                    icon="more_vert"
                    class="my-text-primary"
                    flat
                    round
                    dense
                  />
                  <q-menu :offset="[-20, -5]" class="rounded-borders q-py-sm">
                    <q-list>
                      <q-item
                        clickable
                        @click="editAccount(props.row)"
                        v-close-popup
                        class="menu-list"
                      >
                        <q-item-section class="q-px-sm" style="width: 100px"
                          >Edit</q-item-section
                        >
                      </q-item>
                      <q-item
                        clickable
                        @click="deleteAccount(props.row)"
                        v-close-popup
                        class="menu-list"
                      >
                        <q-item-section class="q-px-sm" style="width: 100px">
                          Delete
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-td>
              </template>
              <!-- Handle table when data not available -->
              <template v-if="!currentRows.length" v-slot:bottom-row>
                <q-tr>
                  <q-td
                    colspan="100%"
                    class="text-center"
                    style="font-weight: normal; border-radius: 12px !important"
                  >
                    No Data Available
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-scroll-area>
    </q-page>
  </transition>
</template>

<script src="src/pages/AccountsMgmt/scripts/AccountsMgmt.js"></script>
