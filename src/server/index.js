import { httpDel, httpGet, httpPost, httpPut } from "../boot/axios";
import { ref, readonly } from "vue";
import { date } from "quasar";

// Fetch Accounts
const FetchAccounts = () => {
  return new Promise((resolve, reject) => {
    httpGet("accounts", {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Fetch Books
const FetchBooks = () => {
  return new Promise((resolve, reject) => {
    httpGet("inventory_books", {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Fetch Sales
const FetchSales = () => {
  return new Promise((resolve, reject) => {
    httpGet("sales", {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Fetch All Data From a Category using ID
const FetchData = (path, payload) => {
  return new Promise((resolve, reject) => {
    httpGet(
      `${path}/?${payload.endpoint}`,
      {
        success(response) {
          resolve(response.data);
        },
        catch(response) {
          reject(response);
        },
      },
      payload.params
    );
  });
};

let CurrentRows = ref([]);
let Search = ref([]);
let SearchedParams = ref(null);

const GetSearchResult = (path, payload) => {
  return new Promise((resolve, reject) => {
    httpGet(
      `${path}`,
      {
        success(response) {
          response.data.status === 200 &&
            (Search.value.tickets = response.data);
          CurrentRows.value = response.data; //modified
          resolve(response);
        },
        catch(response) {
          reject(response);
        },
      },
      payload.params
    );
  });
};

export {
  Search,
  FetchAccounts,
  FetchBooks,
  FetchData,
  FetchSales,
  GetSearchResult,
  CurrentRows as currentRows,
  SearchedParams,
};
