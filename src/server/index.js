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
      `sales/?${payload.endpoint}`,
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

// Adding Account to DB
const AddAccount = (payload) => {
  return new Promise((resolve, reject) => {
    httpPost("accounts", payload, {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Fetch Single Account
const FetchAccount = (payload) => {
  return new Promise((resolve, reject) => {
    httpGet(`accounts/?${payload.id}`, {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Editing Account on DB
const EditAccount = (payload) => {
  return new Promise((resolve, reject) => {
    httpPut(`accounts/${payload.id}`, payload, {
      success(response) {
        resolve(response);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Deleting Account on DB
const DeleteAccount = (payload) => {
  return new Promise((resolve, reject) => {
    httpDel(`accounts/${payload.id}`, {
      success(response) {
        resolve(response);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

let CurrentRows = ref([]);
let Search = ref([]);
let SearchedParams = ref(null);
let params = ref(null);

// queries for mobile date and time filters
let TypeValue = ref(null);
let PrevDate = ref(null);
let Keyword = ref(null);
let DateRange = ref({ from: null, to: null });

let GetSearchResult = (payload) => {
  params.value = payload.params;
  return new Promise((resolve, reject) => {
    httpGet(
      `${payload.path}/${payload.endpoint}`,
      {
        success(response) {
          response.status === 200 && (Search.value = response.data);
          CurrentRows.value = response.data;
          resolve(response);
        },
        catch(response) {
          console.log(response);
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
  AddAccount,
  FetchAccount,
  EditAccount,
  DeleteAccount,
  GetSearchResult,
  CurrentRows as currentRows,
  SearchedParams,
  TypeValue as typeValue,
  PrevDate as prevDate,
  Keyword as keyword,
  DateRange as dateRange,
};
