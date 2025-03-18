import * as z from "zod";
import type { BaseOfFunction, TypesFunction, ThingsToDo } from "./base";
import { errorChecker } from ".";

export type ObjectCheckers = {
  value: (vb: Record<string, TypesFunction>) => ObjectCheckers; // Declare that values that are to check like { test: e.string().min(6, "Field test is too short!")}
  optional: () => ObjectCheckers;
} & BaseOfFunction;

// Then getType will return zod functions based on value
// And Validate will return things to check based on value

// In value function should i declare what to do for validate and for getType?
// ----- YESSSSS

export function object(name?: string) {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    f: (v: any) => {
      if (typeof v !== "object") {
        return name
          ? `The field '${name}' has an invalid type or value!`
          : "One of the required fields has an invalid type or value!";
      }

      return null;
    },
  };

  const check: ObjectCheckers = {
    value: (vb: Record<string, TypesFunction>) => {
      const nextThingsToDo: Record<string, ThingsToDo> = {};
      for (const [key, value] of Object.entries(vb)) {
        const checkers = value.validate();
        const checkersThingsToDo: ThingsToDo = {};

        for (const [checkKey, check] of Object.entries(checkers)) {
          checkersThingsToDo[checkKey] = check;
        }
        nextThingsToDo[key] = checkersThingsToDo;
      }

      // For Error Checker
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      thingsToDo.value = (v: any) => {
        const error = errorChecker(v, {
          general: vb,
        });

        if (error.general) {
          return error.general;
        }

        return null;
      };

      return check;
    },
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
      return optional ? z.string().optional() : z.string();
    },
  };

  return check;
}
