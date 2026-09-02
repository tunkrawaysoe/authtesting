import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import "./CreateAndEditForm.css";

const CreateAndEditForm = ({ submitForm, form, setForm, title }) => {
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  }

  function handleGenreChange(genreId) {
    setForm((prev) => ({
      ...prev,
      genreIds: prev.genreIds.includes(genreId)
        ? prev.genreIds.filter((id) => id !== genreId)
        : [...prev.genreIds, genreId],
    }));
  }

  function addActor(actorId) {
    if (!actorId) return;

    setForm((prev) => {
      const alreadyExist = prev.actors.some(
        (actor) => actor.actorId === actorId,
      );

      if (alreadyExist) return prev;

      return {
        ...prev,
        actors: [
          ...prev.actors,
          {
            actorId,
            characterName: "",
          },
        ],
      };
    });
  }

  function updateCharacter(actorId, value) {
    setForm((prev) => ({
      ...prev,
      actors: prev.actors.map((actor) =>
        actor.actorId === actorId ? { ...actor, characterName: value } : actor,
      ),
    }));
  }

  function removeActor(actorId) {
    if (!actorId) return;
    setForm((prev) => ({
      ...prev,
      actors: prev.actors.filter((actor) => actor.actorId !== actorId),
    }));
  }

  function addDirector(directorId) {
    if (!directorId) return;

    setForm((prev) => {
      if (prev.directorIds.includes(directorId)) {
        return prev;
      }

      return {
        ...prev,
        directorIds: [...prev.directorIds, directorId],
      };
    });
  }

  function removeDirector(directorId) {
    if (!directorId) return;

    setForm((prev) => ({
      ...prev,
      directorIds: prev.directorIds.filter((id) => id !== directorId),
    }));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [genreRes, actorRes, directorRes] = await Promise.all([
          api.get("/genres"),
          api.get("/actors"),
          api.get("/directors"),
        ]);

        setGenres(genreRes.data);
        setActors(actorRes.data);
        setDirectors(directorRes.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="create-movie-container">
      <form className="create-movie-card" onSubmit={submitForm}>
        <h1>{title}</h1>

        <input
          type="text"
          name="title"
          placeholder="Movie title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
        />

        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={form.posterUrl}
          onChange={handleChange}
        />

        <input
          type="text"
          name="backdropUrl"
          placeholder="Backdrop URL"
          value={form.backdropUrl}
          onChange={handleChange}
        />

        <input
          type="text"
          name="language"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />

        <div className="genres-container">
          <h3>Genres</h3>

          <div className="genre-list">
            {genres.map((genre) => (
              <label key={genre.id}>
                <input
                  type="checkbox"
                  checked={form.genreIds.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>

        <div className="actors-container">
          <h3>Actors</h3>

          <select
            defaultValue=""
            onChange={(e) => {
              addActor(Number(e.target.value));
              e.target.value = "";
            }}
          >
            <option value="">Select Actor</option>

            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
          </select>

          {form.actors.map((actor) => (
            <div key={actor.actorId} className="actor-item">
              <span>{actors.find((a) => a.id === actor.actorId)?.name}</span>

              <input
                type="text"
                placeholder="Character Name"
                value={actor.characterName}
                onChange={(e) => updateCharacter(actor.actorId, e.target.value)}
              />

              <button type="button" onClick={() => removeActor(actor.actorId)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="director-container">
          <h3>Directors</h3>

          <select
            defaultValue=""
            onChange={(e) => {
              addDirector(Number(e.target.value));
              e.target.value = "";
            }}
          >
            <option value="">Select Director</option>

            {directors.map((director) => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>

          {form.directorIds.map((directorId) => (
            <div key={directorId} className="director-item">
              <span>
                {directors.find((director) => director.id === directorId)?.name}
              </span>

              <button type="button" onClick={() => removeDirector(directorId)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit">{title}</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/movies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAndEditForm;
