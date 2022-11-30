import { describe, test, expect, jest } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";

let mockData: IMovie[] = [
  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1998",
  },

  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1998",
  },

  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1996",
  },
];

jest.mock("axios", () => ({
  get: async () => {
    return new Promise((resolve) => {
      resolve({ data: { Search: mockData } });
    });
  },
}));

describe("api", () => {
  test("should get mockdata", async () => {
    //Arrange
    let textSearch: string = "söker film";
    //Act
    let movieInfo: IMovie[] = await getData(textSearch);

    console.log(movieInfo);

    //Assert
    expect(movieInfo.length).toBe(3);
    expect(movieInfo[2].Year).toBe("1996");
  });
  /*   test("should return []", async () => {
    //Arrange
    let textSearch: string = "";
    //Act
    let movieInfo: IMovie[] = await getData(textSearch);
    //Assert
    expect().toBe([]); */
});
