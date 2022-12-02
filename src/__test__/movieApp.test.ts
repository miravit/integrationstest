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

jest.mock("./../ts/services/movieservice.ts");
describe("createHTML", () => {
  test("should create html", async () => {
    expect.assertions(3);
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
    get: async (textSearch: string) => {
      return new Promise((resolve, reject) => {
        if (textSearch.length > 3) {
          resolve({ data: { Search: mockData } });
        } else {
          reject({ data: [] });
        }
      });
    },
  }));

  test("should call createHtml", async () => {
    expect.assertions(1);
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
test("should call displayNoResult", async () => {
  //arrange
  document.body.innerHTML = `<form id="searchForm">
  <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
  <button type="submit" id="search">Sök</button>
</form>
<div id="movie-container"></div>`;
  let searchText: string = (
    document.getElementById("searchText") as HTMLInputElement
  ).value;
  searchText = "";
  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;

  let dataSpy = jest.spyOn(functionsService, "getData").mockImplementation(
    () =>
      new Promise((reject) => {
        reject([]);
      })
  );

  let spy = jest.spyOn(functionsMovieApp, "displayNoResult").mockReturnValue();

  //act
  try {
    await functionsMovieApp.handleSubmit();
  } catch {
    expect(dataSpy).toHaveBeenCalled();
    expect(spy).toBeCalledWith(container);
    expect(functionsService.getData).toHaveBeenCalledTimes(1);
  }
});
