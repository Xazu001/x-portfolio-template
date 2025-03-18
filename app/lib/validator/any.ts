import * as z from "zod";
import type { BaseOfFunction, ThingsToDo } from "./base";

export type AnyCheckers = {
  optional: () => AnyCheckers;
} & BaseOfFunction;

export function any(name?: string) {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    f: (v: any) => {
      if (v === undefined || v === null) {
        return name
          ? `The field '${name}' must not be null or undefined!`
          : "One of the required fields must not be null or undefined!";
      }
      return null;
    },
  };

  const check: AnyCheckers = {
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
      return optional ? z.any().optional() : z.any();
    },
  };

  return check;
}
