import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Search, currentRows } from "../../../server/index";
import Filters from "../../../components/FiltersComp.vue";
import Pagination from "../../../components/PaginationComp.vue";

// fetch Accounts data from db
import { FetchAccounts } from "../../../server/index";

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
        style: "font-weight: normal;",
      },
      {
        name: "username",
        field: "username",
        label: "Username",
        align: "left",
        sortable: false,
        style: "font-weight: normal;",
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

    /**
     *  Method to handle when the row is clicked.
     */
    const selectedRow = ref();
    let selectedRowID = null;

    const onRowClick = (evt, row) => {
      selectedRow.value = row; // selects row items
      selectedRowID = row.id;
      if (evt.target.nodeName === "TD") {
        //pushes link to appointment details page
        router.push({
          name: "/",
          params: { id: row.id },
        });
      }
    };

    return {
      router,
      rows,
      columns,
      updatePagination,
      pagination,
      selectedRow,
      selectedRowID,
      onRowClick,
      currentRows,
      Search,
      link: ref("admins"),
    };
  },
};
