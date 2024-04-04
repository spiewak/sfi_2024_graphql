import axios from "axios";
import DataLoader from "dataloader";
import Film from "../schema/film.schema";
import Character from "../schema/character.schema";

class StarWarsService {
  private readonly baseUrl = "https://swapi.dev/api";

  private batchCharacters = new DataLoader(async (ids: number[]) => {
    const characters = await Promise.all(
      ids.map(
        async (id) => (await axios.get(`${this.baseUrl}/people/${id}`)).data
      )
    );

    const mappedCharacters = characters.map(this.characterMapper);

    return mappedCharacters;
  });

  private batchFilms = new DataLoader(async (ids: number[]) => {
    const films = await Promise.all(
      ids.map(
        async (id) => (await axios.get(`${this.baseUrl}/films/${id}`)).data
      )
    );

    const mappedFilms = films.map(this.filmMapper);

    return mappedFilms;
  });

  private filmMapper(film: any): Film {
    return {
      title: film.title,
      director: film.director,
      producer: film.producer,
      releaseDate: film.release_date,
      charactersIds: film.characters.map(
        (url: string) => url.split("/").slice(-2)[0]
      ),
      characters: [],
    };
  }

  private characterMapper(character: any): Character {
    return {
      name: character.name,
      height: character.height,
      gender: character.gender,
      filmsIds: character.films.map(
        (url: string) => url.split("/").slice(-2)[0]
      ),
      films: [],
    };
  }

  async getFilms() {
    const results = (await axios.get(`${this.baseUrl}/films`)).data.results;
    return results.map(this.filmMapper);
  }

  async getCharacters() {
    const results = (await axios.get(`${this.baseUrl}/people`)).data.results;
    return results.map(this.characterMapper);
  }

  async getCharacter(id: number) {
    return (await this.batchCharacters.load(id)) as Character;
  }

  async getFilm(id: number) {
    return (await this.batchFilms.load(id)) as Film;
  }

  async getFilmsByIds(ids: number[]) {
    return (await this.batchFilms.loadMany(ids)) as Film[];
  }

  async getCharactersByIds(ids: number[]) {
    return (await this.batchCharacters.loadMany(ids)) as Character[];
  }
}

export default StarWarsService;
