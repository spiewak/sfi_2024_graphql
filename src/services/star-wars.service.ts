import axios from "axios";
import Film from "../schema/film.schema";
import Character from "../schema/character.schema";

class StarWarsService {
  private readonly baseUrl = "https://swapi.dev/api";

  private filmMapper(film: any): Film {
    return {
      title: film.title,
      director: film.director,
      producer: film.producer,
      releaseDate: film.release_date,
    };
  }

  private characterMapper(character: any): Character {
    return {
      name: character.name,
      height: character.height,
      gender: character.gender,
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
    const result = (await axios.get(`${this.baseUrl}/people/${id}`)).data;
    return this.characterMapper(result);
  }

  async getFilm(id: number) {
    const result = (await axios.get(`${this.baseUrl}/films/${id}`)).data;
    return this.filmMapper(result);
  }
}

export default StarWarsService;
