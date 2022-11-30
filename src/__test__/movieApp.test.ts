/**
 *@jest-environment jsdom
 */
import { jest } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import * as functionsMovieApp from "../ts/movieApp";
import * as functionsService from "../ts/services/movieservice";

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

/* jest.mock("./../ts/services/movieservice.ts");
//describe("handleSubmit", () => {
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
