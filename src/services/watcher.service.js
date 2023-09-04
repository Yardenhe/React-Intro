import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const STORGE_KEY = "WatcherKey";
const watchers = [
  {
    id: "w101",
    fullname: "Puki Ba",
    movies: ["Rambo", "Rocky"],
  },
  {
    id: "w102",
    fullname: "Muki Da",
    movies: ["Titanic", "Star Wars"],
  },
  {
    id: "w103",
    fullname: "Suki Sa",
    movies: ["Forrest Gump", "Avatar"],
  },
];

export const WatcherService = {
  GetWatchers,
  AddWatcher,
  RemoveWatcher,
  UpdateWatcher,
};

//creat watcher
_creatWatchers();

async function GetWatchers() {
  const watchers = await storageService.query(STORGE_KEY);
  return watchers;
}

async function AddWatcher(watcher) {
  const NewWatcher = await storageService.post(STORGE_KEY, watcher);
  return NewWatcher;
}
async function RemoveWatcher(watcherId) {
  await storageService.remove(STORGE_KEY, watcherId);
}
async function UpdateWatcher(watcher) {
  await storageService.put(STORGE_KEY, watcher);
}

function _creatWatchers() {
  const watcherslist = utilService.loadFromStorage(STORGE_KEY) || [];
  if (!watcherslist || !watcherslist.length) {
    utilService.saveToStorage(STORGE_KEY, watchers);
  }
}
