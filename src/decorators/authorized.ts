import { createMethodDecorator } from "type-graphql";
import { ContextValue } from "../server";

export function Authorized() {
  return createMethodDecorator<ContextValue>(async ({ context }, next) => {
    if (context.req.headers["x-graphql-auth-token"] !== "secrettoken") {
      throw new Error("Unauthorized");
    }

    return next();
  });
}
