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
            <div class="text-h3">Inventory</div>
            <p class="text-grey-6 q-mt-sm">
              Here, you can modify the inventory data.
            </p>
          </div>

          <!-- Accounts Table -->
          <div
            class="items-center text-16 q-pa-lg my-bg-accent-0 rounded-borders"
          >
            <q-list class="q-gutter-x-lg my-text-accent-2 q-mb-lg row">
              <q-item
                clickable
                :active="link === 'books'"
                @click="link = 'books'"
                active-class="my-active-link"
                class="my-link"
              >
                Books
              </q-item>
              <q-item
                clickable
                :active="link === 'uniform'"
                @click="link = 'uniform'"
                active-class="my-active-link"
                class="my-link"
              >
                Uniform
              </q-item>
              <q-item
                clickable
                :active="link === 'pajah'"
                @click="link = 'pajah'"
                active-class="my-active-link"
                class="my-link"
              >
                Pajah
              </q-item>
              <q-item class="col justify-end q-gutter-x-lg">
                <q-btn
                  no-caps
                  flat
                  icon="query_stats"
                  class="bg-primary text-white text-weight-regular q-px-lg rounded-borders-10"
                  label="Forecast"
                  ><div class="gt-md q-pr-sm"></div>
                </q-btn>
                <q-btn
                  no-caps
                  flat
                  icon="person"
                  class="bg-primary text-white text-weight-regular rounded-borders-10"
                  style="line-height: 1.2"
                  label="Add a new record"
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

<script src="src/pages/InventoryMgmt/scripts/BooksInventoryMgmt.js"></script>
