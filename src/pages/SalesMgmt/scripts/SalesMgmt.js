import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { Search, currentRows } from "../../../server/index";
import Filters from "../../../components/FiltersComp.vue";
import Pagination from "../../../components/PaginationComp.vue";
// import { Search } from "../../../composables/Search";

// fetch sales data from db
import {
  FetchSales,
  FetchData,
  currentRows,
  Search,
} from "../../../server/index";

export default {
  components: {
    Filters,
    Pagination,
  },

  setup() {
    onMounted(() => {
      // FetchSales().then((response) => {
      //   rows.value = response;
      //   currentRows.value = rows.value.slice(0, pagination.value.rowsPerPage);
      // });
      FetchData("sales", {
        endpoint: "",
        params: "",
      }).then((response) => {
        rows.value = response;
        Search.value = rows.value.slice(0, pagination.value.rowsPerPage);
      });
    });

    // Router
    const router = useRouter();

    // Rows
    let rows = ref([]);

    // Column Headers
    const columns = [
      {
        name: "id",
        field: "id",
        label: "Sales ID",
        align: "center",
        sortable: false,
        headerStyle: "text-align: center;",
        style: "font-weight: normal; text-align: center;",
      },
      {
        name: "unitName",
        field: "unit_name",
        label: "Unit Name",
        align: "left",
        sortable: true,
        style: "font-weight: normal;",
      },
      {
        name: "totalSales",
        field: "total_sales",
        label: "Total Sales",
        align: "center",
        sortable: false,
        style: "font-weight: normal;",
      },
      {
        name: "date",
        field: "date",
        label: "Date",
        align: "center",
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
      rowsPerPage: 6,
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
      link: ref("books"),
      Search,
    };
  },
};
