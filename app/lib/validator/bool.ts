import * as z from "zod";
import type { BaseOfFunction, ThingsToDo } from "./base";

export type BoolCheckers = {
  optional: () => BoolCheckers;
} & BaseOfFunction;

export function bool(name?: string) {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    f: (v: any) => {
      if (typeof v !== "boolean") {
        return name
          ? `The field '${name}' must be a boolean!`
          : "One of the required fields must be a boolean!";
      }
      return null;
    },
  };

  const check: BoolCheckers = {
    optional: () => {
      optional = true;
      return check;
    },
    validate: () => {
      return {
        ...thingsToDo,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        optional: (v: any) => {
          return optional ? "true" : "false";
        },
      };
    },
    getType: () => {
      return optional ? z.number().optional() : z.number();
    },
  };

  return check;
}
