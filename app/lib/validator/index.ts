import * as z from "zod";
import {
  validator as zodValidator,
  resolver as zodResolver,
} from "hono-openapi/zod";
import type { ValidationTargets } from "hono";
import type { MiddlewareHandler } from "hono";
import type { EFunctionsInputs } from "./base";
import type { ResolverResult } from "hono-openapi";

type ValidatorInput = EFunctionsInputs;

export const validator = (
  type: keyof ValidationTargets,
  err: ValidatorInput
): MiddlewareHandler => {
  const validationSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(err)) {
    for (const [field, validator] of Object.entries(value)) {
      const validatorInstance = validator;
      if (validatorInstance?.getType()) {
        validationSchema[field] = validatorInstance.getType();
      }
    }
  }

  const zodMiddleware = zodValidator(type, z.object(validationSchema));

  return zodMiddleware;
};

export function resolver(err: ValidatorInput): ResolverResult {
  const validationSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(err)) {
    validationSchema[key] = z.string().optional();
  }

  const schema = z.object(validationSchema);

  return zodResolver(schema);
}

export const errorChecker = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  obj: Record<string, any>,
  err: ValidatorInput
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [key, value] of Object.entries(err)) {
    for (const [field, validator] of Object.entries(value)) {
      const validatorInstance = validator;
      const fieldValue = obj[field];

      if (validatorInstance) {
        const checkers = validatorInstance.validate();

        if (checkers?.optional && checkers.optional(fieldValue) === "false") {
          if (!fieldValue && fieldValue !== 0) {
            errors[key] = `Key ${field} is missing!`;
          }
          if (fieldValue) {
            if (checkers?.f?.(fieldValue)) {
              const result = checkers?.f?.(fieldValue);
              if (typeof result === "string") {
                errors[key] = result;
              }
            }
            if (!checkers?.f?.(fieldValue)) {
              for (const check of Object.values(checkers)) {
                if (check) {
                  const checkerResult = check(fieldValue);

                  if (
                    checkerResult &&
                    checkerResult !== "false" &&
                    typeof checkerResult === "string"
                  ) {
                    errors[key] = checkerResult;
                  }
                }
              }
            }
          }
        }

        if (checkers?.optional && checkers.optional(fieldValue) === "true") {
          if (fieldValue) {
            if (checkers?.f?.(fieldValue)) {
              const result = checkers?.f?.(fieldValue);
              if (typeof result === "string") {
                errors[key] = result;
              }
            }
            if (!checkers?.f?.(fieldValue)) {
              for (const check of Object.values(checkers)) {
                if (check) {
                  const checkerResult = check(fieldValue);

                  if (
                    checkerResult &&
                    checkerResult !== "false" &&
                    typeof checkerResult === "string" &&
                    checkerResult !== "true"
                  ) {
                    errors[key] = checkerResult;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return errors;
};

export * from "./string";
export * from "./number";
export * from "./object";
export * from "./any";
export * from "./array";
export * from "./bool";
