// eslint-disable-next-line max-len
export default function searchFilter(list, key, sortedOn, sortedOff, open, close, regActive, regNotActive) {
  const search = key;
  const listArr = [...list];
  // вывод списка при пустом запросе в поисковике
  if (!search.length) {
    if (sortedOn && open) {
      return listArr
        .sort((prev, next) => (prev.title.toLowerCase()
        > next.title.toLowerCase() ? 1 : -1))
        .sort((a, b) => b.main - a.main)
        .filter((item) => item.title.indexOf(search) > -1);
    }
    if (sortedOff && open) {
      return listArr.sort((a, b) => b.main - a.main);
    }
    if (sortedOn && close) {
      return listArr.sort((prev, next) => (prev.title.toLowerCase()
      > next.title.toLowerCase() ? 1 : -1))
        .filter((item) => item.title.indexOf(search) > -1);
    }
    if (sortedOff && close) {
      return listArr;
    }
  }
  // объединение поиска и сортировки
  if (open || close) {
    if (regActive && sortedOn) {
      return listArr.sort((prev, next) => (prev.title.toLowerCase()
      > next.title.toLowerCase() ? 1 : -1))
        .filter((item) => item.title.indexOf(search) > -1);
    }
    if (regActive && sortedOff) {
      return listArr.filter((item) => item.title.indexOf(search) > -1);
    }
    if (regNotActive && sortedOn) {
      return listArr
        .sort((prev, next) => (prev.title.toLowerCase()
        > next.title.toLowerCase() ? 1 : -1))
        .filter((item) => item.title.toUpperCase().indexOf(search.toUpperCase()) > -1);
    }
  }
  // вывод списка по значению в поиске
  return listArr
    .filter((item) => item.title.toUpperCase().indexOf(search.toUpperCase()) > -1);
}
