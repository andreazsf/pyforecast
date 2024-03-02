<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <q-page class="flex flex-center bg-white">
      <q-scroll-area class="absolute full-width full-height q-pt-md">
        <div class="full-width q-px-lg q-pb-xl" style="min-height: 90vh">
          <!-- Heading -->
          <div>
            <div class="text-h3">Accounts</div>
            <p class="text-grey-6 q-mt-sm">Manage and create accounts here.</p>
          </div>

          <!-- Accounts Table -->
          <div
            class="items-center text-16 q-pa-lg my-bg-accent-0 rounded-borders"
          >
            <q-list
              class="my-text-accent-2 row"
              :class="
                $q.screen.width <= 414
                  ? 'justify-center full-width'
                  : 'q-mb-lg q-gutter-x-md'
              "
            >
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
              <q-item
                class="col"
                :class="
                  $q.screen.width <= 414
                    ? 'justify-center full-width col-auto'
                    : 'q-gutter-x-lg justify-end'
                "
              >
                <q-btn
                  no-caps
                  flat
                  icon="person"
                  class="bg-primary text-white text-weight-regular rounded-borders-10"
                  label="Add a new account"
                  @click="addAccountDialog = true"
                >
                  <div class="gt-md q-pr-sm"></div>
                </q-btn>
              </q-item>
            </q-list>

            <!-- Add account form pop up -->
            <q-dialog v-model="addAccountDialog" persistent>
              <q-card
                style="width: 490px; max-width: 80vw"
                class="q-pa-lg rounded-borders-16"
              >
                <q-form>
                  <q-card-section class="q-pb-lg q-mb-md q-gutter-y-md text-16">
                    <div class="row q-gutter-x-lg">
                      <div class="col">
                        <div class="text-black q-mb-sm">Prefix</div>
                        <q-select
                          v-model="form.prefix"
                          :label="form.prefix !== '' ? '' : 'None'"
                          emit-value
                          map-options
                          :options="prefix"
                          hide-bottom-space
                          popup-content-class="my-option-style-light q-py-sm"
                          options-selected-class="selected-class"
                          transition-show="scale"
                          transition-hide="scale"
                          borderless
                          autocomplete="off"
                          class="input-type q-px-lg"
                        />
                      </div>
                      <div class="col">
                        <div class="text-black q-mb-sm">User Type</div>
                        <q-select
                          v-model="form.userType"
                          :label="form.userType !== '' ? '' : 'None'"
                          emit-value
                          map-options
                          :options="userType"
                          hide-bottom-space
                          popup-content-class="my-option-style-light q-py-sm"
                          options-selected-class="selected-class"
                          transition-show="scale"
                          transition-hide="scale"
                          borderless
                          autocomplete="off"
                          class="input-type q-px-lg"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-x-lg">
                      <div class="col">
                        <div class="text-black q-mb-sm">First Name</div>
                        <q-input
                          v-model="form.firstName"
                          borderless
                          autocomplete="off"
                          placeholder="e.g. Juan"
                          class="input-type q-px-lg"
                        />
                      </div>
                      <div class="col">
                        <div class="text-black q-mb-sm">Last Name</div>
                        <q-input
                          v-model="form.lastName"
                          borderless
                          autocomplete="off"
                          placeholder="e.g. Dela Cruz"
                          class="input-type q-px-lg"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-x-lg">
                      <div class="col">
                        <div class="text-black q-mb-sm">Email Address</div>
                        <q-input
                          v-model="form.emailAddress"
                          borderless
                          autocomplete="off"
                          type="email"
                          suffix="@cvsu.edu.ph"
                          placeholder="e.g. juandelacruz"
                          class="input-type q-px-lg"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-x-lg">
                      <div class="col">
                        <div class="text-black q-mb-sm">Username</div>
                        <q-input
                          v-model="form.username"
                          borderless
                          autocomplete="off"
                          class="input-type q-px-lg"
                          mask="aaaaaaaa"
                          placeholder="Max of 10 characters"
                        />
                      </div>
                      <div class="col">
                        <div class="text-black q-mb-sm">Password</div>
                        <q-input
                          v-model="form.password"
                          :type="isPwd ? 'password' : form.password.value"
                          lazy-rules
                          borderless
                          autocomplete="off"
                          placeholder="New password"
                          class="input-type q-px-lg"
                        >
                          <template v-slot:append>
                            <q-icon
                              :name="isPwd ? 'visibility_off' : 'visibility'"
                              class="cursor-pointer"
                              v-on:click="isPwd = !isPwd"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-actions align="right" class="bg-white text-16">
                    <q-btn
                      @click="addAccount()"
                      :disable="!isFormValid()"
                      no-caps
                      flat
                      label="Save"
                      class="my-bg-accent-5 text-white rounded-borders-16 text-black q-mr-sm"
                      :style="
                        $q.screen.width <= 414
                          ? 'width: 96px; height: 56px'
                          : 'width: 128px; height: 56px'
                      "
                      v-close-popup
                    />
                    <q-btn
                      no-caps
                      flat
                      label="Cancel"
                      class="my-bg-accent-4 text-white rounded-borders-16"
                      :style="
                        $q.screen.width <= 414
                          ? 'width: 96px; height: 56px'
                          : 'width: 128px; height: 56px'
                      "
                      v-close-popup
                    />
                  </q-card-actions>
                </q-form>
              </q-card>
            </q-dialog>

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
                    <q-list class="q-py-sm">
                      <q-item
                        clickable
                        @click="
                          editAccount(props.row);
                          editAccountDialog = true;
                        "
                        v-close-popup
                        class="menu-list q-py-md"
                        style="width: 224px"
                      >
                        <q-item-section avatar>
                          <q-icon
                            name="edit"
                            size="sm"
                            class="material-symbols-outlined q-ml-md"
                          />
                        </q-item-section>
                        <q-item-section>Edit Details</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        @click="deleteAccount(props.row)"
                        v-close-popup
                        class="menu-list q-py-md"
                        style="width: 224px"
                      >
                        <q-item-section avatar>
                          <q-icon
                            name="cancel"
                            size="sm"
                            class="material-symbols-outlined q-ml-md"
                          />
                        </q-item-section>
                        <q-item-section> Delete Account </q-item-section>
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

            <!-- Edit account form pop up -->
            <q-dialog v-model="editAccountDialog" persistent>
              <q-card
                style="width: 490px; max-width: 80vw"
                class="q-pa-lg rounded-borders-16"
              >
                <q-card-section class="q-pb-lg q-mb-md q-gutter-y-md text-16">
                  <div class="row q-gutter-x-lg">
                    <div class="col">
                      <div class="text-black q-mb-sm">Prefix</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                    <div class="col">
                      <div class="text-black q-mb-sm">User Type</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-x-lg">
                    <div class="col">
                      <div class="text-black q-mb-sm">First Name</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                    <div class="col">
                      <div class="text-black q-mb-sm">Last Name</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-x-lg">
                    <div class="col">
                      <div class="text-black q-mb-sm">Email Address</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-x-lg">
                    <div class="col">
                      <div class="text-black q-mb-sm">Username</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                    <div class="col">
                      <div class="text-black q-mb-sm">Password</div>
                      <q-input
                        borderless
                        autocomplete="off"
                        name="Email"
                        class="input-type q-px-lg"
                      />
                    </div>
                  </div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-16">
                  <q-btn
                    no-caps
                    flat
                    label="Save"
                    class="my-bg-accent-5 text-white rounded-borders-16 text-black q-mr-sm"
                    style="width: 128px; height: 56px"
                    v-close-popup
                  />
                  <q-btn
                    no-caps
                    flat
                    label="Cancel"
                    class="my-bg-accent-4 text-white rounded-borders-16"
                    style="width: 128px; height: 56px"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </q-scroll-area>
    </q-page>
  </transition>
</template>

<script src="src/pages/AccountsMgmt/scripts/AccountsMgmt.js"></script>
