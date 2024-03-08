import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { Search, currentRows } from "../../../server/index";
import Filters from "../../../components/FiltersComp.vue";
import Pagination from "../../../components/PaginationComp.vue";

// fetch Accounts data from db
import {
  FetchAccounts,
  AddAccount,
  EditAccount,
  DeleteAccount,
} from "../../../server/index";

export default {
  components: {
    Filters,
    Pagination,
  },

  setup() {
    onMounted(() => {
      FetchAccounts().then((response) => {
        rows.value = response;
        currentRows.value = rows.value.slice(0, pagination.value.rowsPerPage);
      });
    });

    // Router
    const router = useRouter();

    // q
    const $q = useQuasar();

    // Rows
    let rows = ref([]);

    // Column Headers
    const columns = [
      {
        name: "prefix",
        field: "prefix",
        label: "Prefix",
        align: "center",
        sortable: false,
        headerStyle: "text-align: left; padding-left: 32px;",
        style: "font-weight: normal; text-align: left; padding-left: 32px;",
      },
      {
        name: "firstName",
        field: "first_name",
        label: "First Name",
        align: "left",
        sortable: true,
        style: "font-weight: normal;",
      },
      {
        name: "lastName",
        field: "last_name",
        label: "Last Name",
        align: "left",
        sortable: true,
        style: "font-weight: normal;",
      },
      {
        name: "emailAddress",
        field: "email_address",
        label: "Email Address",
        align: "left",
        sortable: false,
        style: "font-weight: normal; min-width: 200px",
      },
      {
        name: "username",
        field: "username",
        label: "Username",
        align: "left",
        sortable: false,
        style: "font-weight: normal; min-width: 136px",
      },
      {
        name: "password",
        field: "password",
        label: "Password",
        align: "left",
        sortable: false,
        style: "font-weight: normal;",
      },
      {
        name: "userType",
        field: "user_type",
        label: "User Type",
        align: "left",
        sortable: false,
        style: "font-weight: normal;",
      },
      {
        name: "actions",
        label: "Action",
        align: "center",
        field: "actions",
        headerStyle: "padding-right: 32px;",
        style: "text-align: center",
      },
    ];

    // Pagination
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });

    /**
     *  This function updates the row data in the column whenever called.
     *
     *  It updates the startIndex and endIndex and then proceed with updating the currentRows.
     *  currentRows are the rows shown in the table.
     */
    const updatePagination = () => {
      const startIndex =
        (pagination.value.page - 1) * pagination.value.rowsPerPage;
      const endIndex = startIndex + pagination.value.rowsPerPage - 1;
      Search.value = rows.value.slice(startIndex, endIndex + 1);
    };

    // Form
    const form = ref({
      id: null,
      prefix: [],
      userType: [],
      firstName: "",
      lastName: "",
      emailAddress: "",
      username: "",
      password: "",
    });

    // Function to check if form is valid
    const isFormValid = () => {
      return (
        form.value.prefix !== "" &&
        form.value.userType.length !== 0 &&
        form.value.firstName !== "" &&
        form.value.lastName !== "" &&
        form.value.emailAddress !== "" &&
        form.value.username !== "" &&
        form.value.password !== ""
      );
    };

    const addAccount = () => {
      FetchAccounts().then((response) => {
        let accounts = response;

        let highestId = 0;

        // Find the highest existing ID
        accounts.forEach((account) => {
          if (account.id > highestId) {
            highestId = parseInt(account.id); // Parse ID as integer
          }
        });

        // Increment the ID for the new account
        const newId = highestId + 1;

        const data = {
          id: `${newId}`,
          prefix: form.value.prefix,
          user_type: form.value.userType,
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          email_address: form.value.emailAddress,
          username: form.value.username,
          password: form.value.password,
        };

        // Add the new account to the server
        AddAccount(data).then((response) => {
          // Make sure ID is stored as a number in the JSON file
          data.id = newId; // Ensure newId is a number

          // Assuming your AddAccount function updates the JSON file, make sure it stores IDs as numbers
          // Example: addAccountToJSONFile(data); // Ensure that this function stores IDs as numbers

          let status = Boolean(response.data !== "undefined");
          $q.notify({
            // Post notification on lower right side on the organizational management page
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: `${
              status ? "my-success-notif" : "my-error-notif"
            } q-px-lg q-pt-none q-pb-none q-mr-lg q-mb-md`,
            html: true,
            message: status
              ? `<div class="text-bold">Added Succesfully!</div> A new account has been added as a/an ${form.value.userType}.`
              : `<div class="text-bold">Failed to add the new account!</div>`,
          });
        });

        // Reload the page after the notification is dismissed
        setTimeout(() => {
          router.go(); // Reload the page
        }, 5000);
      });
    };

    /**
     *  Method to handle when the row is clicked.
     */
    // const selectedRow = ref();
    // let selectedRowID = null;

    // const onRowClick = (evt, row) => {
    //   selectedRow.value = row; // selects row items
    //   selectedRowID = row.id;
    //   if (evt.target.nodeName === "TD") {
    //     //pushes link to appointment details page
    //     router.push({
    //       name: "/",
    //       params: { id: row.id },
    //     });
    //   }
    // };

    const fetchAll = () => {
      form.value.prefix = "";
      form.value.userType = "";
      form.value.firstName = "";
      form.value.lastName = "";
      form.value.emailAddress = "";
      form.value.username = "";
      form.value.password = "";
    };

    /**
     *  Method to handle when the row is clicked.
     */
    // const selectedRow = ref();
    // let selectedRowID = null;

    const pushAccount = (row) => {
      /* Prepopulates Edit Input Fields
      in accordance with the row id */
      form.value.id = row.id;
      form.value.prefix = row.prefix;
      form.value.userType = row.user_type;
      form.value.firstName = row.first_name;
      form.value.lastName = row.last_name;
      form.value.emailAddress = row.email_address;
      form.value.username = row.username;
      form.value.password = row.password;
    };

    // Form
    const rowToDelete = ref({
      id: null,
      prefix: [],
      userType: [],
      firstName: "",
      lastName: "",
      emailAddress: "",
      username: "",
      password: "",
    });

    // // Define a reactive variable to store the row to delete
    // const rowToDelete = ref(null);

    // Function to remember the row values when delete button is clicked
    const rememberRowToDelete = (row) => {
      // Copy the row values to the reactive variable
      rowToDelete.value.id = row.id;
      rowToDelete.value.prefix = row.prefix;
      rowToDelete.value.userType = row.user_type;
      rowToDelete.value.firstName = row.first_name;
      rowToDelete.value.lastName = row.last_name;
      rowToDelete.value.emailAddress = row.email_address;
      rowToDelete.value.username = row.username;
      rowToDelete.value.password = row.password;
    };

    // Function to delete the account
    const deleteAccount = () => {
      // console.log(rowToDelete.value.id);

      // if (!rowToDelete.value) {
      //   // No row selected, do nothing
      //   return;
      // }

      // Perform delete operation using the rowToDelete
      DeleteAccount({ id: rowToDelete.value.id });

      $q.notify({
        // Post notification on lower right side on the organizational management page
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `my-success-notif q-px-lg q-pt-none q-pb-none q-mr-lg q-mb-md`,
        html: true,
        message: `<div class="text-bold">Account deleted successfully!</div> ${rowToDelete.value.userType}: ${rowToDelete.value.firstName}'s account has been deleted.`,
      });

      setTimeout(() => {
        router.go(); // Reload the page
      }, 5000);
    };

    const editAccount = () => {
      const dataToEdit = {
        id: form.value.id,
        prefix: form.value.prefix,
        user_type: form.value.userType,
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email_address: form.value.emailAddress,
        username: form.value.username,
        password: form.value.password,
      };
      console.log(dataToEdit);
      EditAccount(dataToEdit)
        .then((response) => {
          let status = Boolean(response.data !== "undefined");
          $q.notify({
            // Post notification on lower right side on the organizational management page
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: `${
              status ? "my-success-notif" : "my-error-notif"
            } q-px-lg q-pt-none q-pb-none q-mr-lg q-mb-md`,
            html: true,
            message: status
              ? `<div class="text-bold">Member's Info was changed succesfully!</div> ${dataToEdit.first_name}'s credentials has been updated.`
              : `<div class="text-bold">Failed to update ${dataToEdit.first_name}'s credentials!</div>`,
          });
        })
        .finally(() => {
          // Reload the page after the notification is dismissed
          setTimeout(() => {
            router.go(); // Reload the page
          }, 5000);
        });
    };

    return {
      router,
      rows,
      columns,
      updatePagination,
      pagination,
      currentRows,
      Search,
      form,
      isFormValid,
      addAccount,
      fetchAll,
      pushAccount,
      editAccount,
      rowToDelete,
      deleteAccount,
      rememberRowToDelete,

      // Pending functions
      // selectedRow,
      // selectedRowID,
      // onRowClick,

      // References
      link: ref("admins"),
      addAccountDialog: ref(false),
      editAccountDialog: ref(false),
      deleteAccountDialog: ref(false),
      emailAddress: ref(null),
      isPwd: ref(true),
      password: ref(""),
      prefix: ["Ms.", "Mr.", "Mrs.", "Mx."],
      userType: ["Admin", "Staff"],
    };
  },
};
