import { observable } from "mobx";

const store = observable({
  currentPage: 1,
  pageSize: 10,
  news: [],
  refresh: 0,
  sortType: {
    label: "New Stories",
    key: "newstories",
  },
  setCurrentPage(value) {
    this.currentPage = value;
  },
  setPageSize(value) {
    this.pageSize = value;
  },
  setNews(value) {
    this.news = value;
  },
  setRefresh(value) {
    this.refresh = value;
  },
  setSortType(value) {
    this.sortType = value;
  },
});

export default store;
