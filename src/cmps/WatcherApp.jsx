import { useState, useEffect, useRef } from "react";
import { WatcherService } from "../services/watcher.service";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function WatcherApp(prop) {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [addWatcher, setAddWatcher] = useState({});

  function handleNameChange(ev) {
    const { value } = ev.target;
    setAddWatcher((prevWatcher) => ({ ...prevWatcher, fullname: value }));
  }
  function handleMovieChange(ev) {
    const { value } = ev.target;
    setAddWatcher((prevWatcher) => ({
      ...prevWatcher,
      movies: value.split(","),
    }));
  }
  function handleUpdateNameChange(ev) {
    const { value } = ev.target;
    setSelectedWatcher((prevWatcher) => ({ ...prevWatcher, fullname: value }));
  }
  // async function loadWatchers() {
  //   try {
  //     const watchers = await WatcherService.GetWatchers();
  //     setWatchers(watchers);
  //   } catch (err) {
  //     console.log("Had issue loading cars");
  //   }
  // }

  useEffect(() => {
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
            <div style={{ backgroundColor: getRandomColor() }}>
              <img className="img-watcher" src={"/img/watcherimg.png"} />
            </div>
            <h1>{watcher.fullname}</h1>
            <button
              onClick={() => {
                WatcherService.RemoveWatcher(watcher.id);
                setWatchers((prevWatchers) => {
                  return prevWatchers.filter((item) => watcher.id !== item.id);
                });
              }}
            >
              X
            </button>
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
      {selectedWatcher !== null ? (
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
          <button
            onClick={() => {
              WatcherService.UpdateWatcher(selectedWatcher);
              setWatchers((prevWatchers) => {
                return prevWatchers.map((item) => {
                  if (selectedWatcher.id === item.id) return selectedWatcher;
                  else return item;
                });
              });
              // setWatchers((prevWatchers) => [...prevWatchers, selectedWatcher]);
              setSelectedWatcher(null);
            }}
          >
            close
          </button>
        </div>
      ) : null}
      {addModal !== false ? (
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
          <button
            onClick={async () => {
              const NewWatcher = await WatcherService.AddWatcher(addWatcher);
              setWatchers((prevWatchers) => [...prevWatchers, NewWatcher]);
              setAddModal(false);
            }}
          >
            Add Watcher
          </button>
          <button onClick={() => setAddModal(false)}>close</button>
        </div>
      ) : null}
    </section>
  );
}
