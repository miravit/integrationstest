import { describe, test, expect, jest } from "@jest/globals";

import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (textSearch: string) => {
    return new Promise((resolve, reject) => {
      if (textSearch.length > 0) {
        resolve({ data: { Search: mockData } });
      } else {
        reject({ data: [] });
      }
    });
  },
})); //här ändar vi till reject och skickar in en tom lista, kolla på hans demo.

describe("getData", () => {
  test("should get mockdata", async () => {
    expect.assertions(2);
    //Arrange
    let textSearch: string = "söker film";
    //Act
    let movieInfo: IMovie[] = await getData(textSearch);

    //Assert
    expect(movieInfo.length).toBe(3);
    expect(movieInfo[2].Year).toBe("1996");
  });

  test("should return error", async () => {
    //Arrange

    let textSearch: string = "";
    let movieInfo: IMovie[] = [];

    try {
      movieInfo = await getData(textSearch);
    } catch (error: any) {
      expect(error).toThrowError();
      expect(error).toHaveReturnedWith([]);
    }
  });
});
