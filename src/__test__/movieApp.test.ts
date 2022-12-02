/**
 *@jest-environment jsdom
 */
import { jest, test, describe, expect } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import * as functionsMovieApp from "../ts/movieApp";
import * as functionsService from "../ts/services/movieservice";
import { mockData } from "../ts/services//__mocks__/movieservice";

describe("init", () => {
  test("should call function", () => {
    let spy = jest.spyOn(functionsMovieApp, "handleSubmit").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve();
        })
    );
    document.body.innerHTML = `<form id="searchForm"><button type="submit" id="search">Sök</button></form>`;

    functionsMovieApp.init();
    (document.getElementById("searchForm") as HTMLFormElement).submit();

    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});

test("(displayNoResult)should create p-tag with a message", () => {
  //arrange
  document.body.innerHTML = `<div id="movie-container"></div>;`;
  const container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  //act

  functionsMovieApp.displayNoResult(container);
  //assert
  expect(container.innerHTML).toContain("<p>Inga sökresultat att visa</p>");
  document.body.innerHTML = "";
});

/* describe("handleSubmit", () => {
test("should call function", () => {
  //arrange

  let spy = jest.spyOn(functionsService, "getData").mockImplementation(
    () =>
      new Promise((resolve) => {
        resolve(movies);
      })
  );

  let searchText: string = "testInput";
  let movies: IMovie[] = [];

  document.body.innerHTML = `<div id="movie-container"></div>;`;
  const container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;

  functionsService.getData(searchText);

  //act
  functionsMovieApp.handleSubmit();
  //assert
  expect(movies.length).toBeGreaterThan(0);
});
 */

jest.mock("./../ts/services/movieservice.ts");
describe("createHTML", () => {
  test("should create html", async () => {
    //arrange
    let searchText: string = "hej hej";
    document.body.innerHTML = `<div id="movie-container"></div>;`;
    const container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    let movies: IMovie[] = await functionsService.getData(searchText);

    //act
    functionsMovieApp.createHtml(movies, container);

    //assert

    expect(document.querySelectorAll("div.movie").length).toBe(3);
    expect(document.querySelectorAll("h3").length).toBe(3);
    expect(document.querySelectorAll("h3")[0].innerHTML).toBe("hej");
    document.body.innerHTML = "";
  });
});

describe("handle submit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  jest.mock("axios", () => ({
    get: async () => {
      return new Promise((reject) => {
        reject({
          data: [],
        });
      });
    },
  }));

  test("should call createHtml", async () => {
    //expect.assertions(1);
    document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
      </form> <div id="movie-container"></div>`;
    let spy = jest.spyOn(functionsMovieApp, "createHtml").mockReturnValue();

    //Act
    await functionsMovieApp.handleSubmit();

    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});
