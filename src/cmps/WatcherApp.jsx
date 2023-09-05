import { useState, useEffect, useRef } from "react";
import { WatcherService } from "../services/watcher.service";
import { utilService } from "../services/util.service";

export function WatcherApp(prop) {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [NewWatcher, setNewWatcher] = useState({});

  async function onRemoveWatcher(watcher) {
    try {
      await WatcherService.RemoveWatcher(watcher.id);
    } catch (error) {
      console.log(error);
    }

    setWatchers((prevWatchers) => {
      return prevWatchers.filter((item) => watcher.id !== item.id);
    });
  }
  async function onAddWatcher(NewWatcher) {
    try {
      const watcher = await WatcherService.AddWatcher(NewWatcher);
    } catch (error) {
      console.log(error);
    }

    setWatchers((prevWatchers) => [...prevWatchers, watcher]);
    setAddModal(false);
  }
  async function onUpdateWatcher() {
    try {
      await WatcherService.UpdateWatcher(selectedWatcher);
    } catch (error) {
      console.log(error);
    }

    setWatchers((prevWatchers) => {
      return prevWatchers.map((item) => {
        if (selectedWatcher.id === item.id) return selectedWatcher;
        else return item;
      });
    });

    setSelectedWatcher(null);
  }

  function handleNameChange(ev) {
    const { value } = ev.target;
    setNewWatcher((prevWatcher) => ({ ...prevWatcher, fullname: value }));
  }
  function handleMovieChange(ev) {
    const { value } = ev.target;
    setNewWatcher((prevWatcher) => ({
      ...prevWatcher,
      movies: value.split(","),
    }));
  }
  function handleUpdateNameChange(ev) {
    const { value } = ev.target;
    setSelectedWatcher((prevWatcher) => ({ ...prevWatcher, fullname: value }));
  }

  useEffect(async () => {
    WatcherService.GetWatchers()
      .then(setWatchers)
      .catch("Had issue loading cars");
  }, []);

  return (
    <section className="watcher-container">
      <h1>Watcher App</h1>
      <button onClick={() => setAddModal(true)}>Add Watcher</button>
      <div className="watchers-row">
        {watchers.map((watcher) => (
          <div key={watcher.id} className="watcher-box">
            <div style={{ backgroundColor: utilService.getRandomColor() }}>
              <img className="img-watcher" src={"/img/watcherimg.png"} />
            </div>
            <h1>{watcher.fullname}</h1>
            <button onClick={() => onRemoveWatcher(watcher)}>X</button>
            <button
              onClick={() => {
                setSelectedWatcher(watcher);
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {selectedWatcher && (
        <div className="modal">
          <input
            type="text"
            className="fullName"
            placeholder="Full Name"
            onChange={handleUpdateNameChange}
            value={selectedWatcher.fullname}
          />
          {selectedWatcher.movies.map((movie) => (
            <li key={movie}>{movie}</li>
          ))}
          <button onClick={() => onUpdateWatcher()}>close</button>
        </div>
      )}
      {addModal && (
        <div className="modal">
          <h1>Add Watcher</h1>
          <input
            type="text"
            className="fullName"
            placeholder="Full Name"
            onChange={handleNameChange}
          />
          <input
            type="text"
            className="movie"
            placeholder="Movies(with comma)"
            onChange={handleMovieChange}
          />
          <button onClick={() => onAddWatcher(NewWatcher)}>Add Watcher</button>
          <button onClick={() => setAddModal(false)}>close</button>
        </div>
      )}
    </section>
  );
}
