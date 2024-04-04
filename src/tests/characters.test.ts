import "reflect-metadata";
import { gCall } from "./utils/gCall";
import { GenderEnum } from "../schema/character.schema";

const characterQuery = `
    query Character($characterId: Int!) {
        character(id: $characterId) {
            gender,
            height
        }
    }
`;

describe("Character query", () => {
  it("get character by id", async () => {
    const characterId = 1;
    const response = await gCall({
      source: characterQuery,
      variableValues: {
        characterId: characterId,
      },
    });

    expect(response).toMatchObject({
      data: {
        character: {
          gender: GenderEnum.MALE,
          height: 172,
        },
      },
    });
  });
});
