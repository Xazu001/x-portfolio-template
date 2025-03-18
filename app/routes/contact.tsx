import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Input from "#/components/basic/inputs/InputWL";
import AccentButton from "#/components/basic/buttons/AccentButton";
import { Resend } from "resend";
import * as e from "#/lib/validator";
import { useActionData } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import Alert from "#/components/basic/inputs/Alert";
import { useNavigation } from "@remix-run/react";
import { useEffect } from "react";
import GoBack from "../components/base/GoBack";
import TransitionWrapper from "../components/base/PageTransitionWrapper";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const errorChecker = e.errorChecker(
    {
      email: email,
      message: message,
    },
    {
      email: {
        email: e
          .string("Email")
          .email("Must be email format!")
          .max(255, "Email must have less than 255 characters!"),
      },
      message: {
        message: e
          .string("Message")
          .min(2, "Message must have at least 2 characters!")
          .max(255, "Message must have less than 255 characters!"),
      },
    }
  );

  if (Object.keys(errorChecker).length > 0) {
    return {
      errors: errorChecker,
    };
  }

  const resend = new Resend(context.cloudflare.env.RESEND_KEY);

  function Message() {
    return (
      <div>
        <div>
          <strong>Just got an message - {message}</strong>
        </div>
        <div>
          <strong>Sent by - {email}</strong>
        </div>
      </div>
    );
  }

  const { data } = await resend.emails.send({
    from: context.cloudflare.env.FROM_EMAIL,
    to: [context.cloudflare.env.TO_EMAIL],
    subject: "Send from Portfolio Site",
    html: renderToString(Message()),
  });

  if (data) {
    return {
      data: {
        general: "success!",
      },
    };
  }

  return {
    errors: {
      general: "Something gone wrong!",
    },
  };
};

export default function Index() {
  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();

  useEffect(() => {
    if (actionData?.data?.general) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      document.getElementsByName("email").forEach((el) => {
        if ((el as HTMLInputElement).value) {
          (el as HTMLInputElement).value = "";
        }
      });
      // biome-ignore lint/complexity/noForEach: <explanation>
      document.getElementsByName("message").forEach((el) => {
        if ((el as HTMLInputElement).value) {
          (el as HTMLInputElement).value = "";
        }
      });
    }
  }, [actionData?.data]);

  return (
    <Form method="post" action=".">
      <div className="mt-[2rem] min-h-svh">
        <section className="pt-0">
          <div className="flex justify-center container">
            <TransitionWrapper>
              <GoBack to="/" />
            </TransitionWrapper>
          </div>
        </section>
        <section className="w-full">
          <div className="flex flex-col gap-4 bg-item-1 shadow-xl p-8 rounded-2xl max-w-screen-sm container">
            <Input
              name="email"
              title="Email"
              placeholder="Enter your email!"
              alert={actionData?.errors?.email}
            />
            <Input
              name="message"
              type="textarea"
              title="Message"
              placeholder="Enter your message!"
              inputClassName="rounded-3xl"
              alert={actionData?.errors?.message}
            />
            <Alert
              type={actionData?.data?.general ? "info" : "alert"}
              msg={actionData?.data?.general || actionData?.errors?.general}
            />
            <AccentButton
              type="submit"
              textClassName="py-3 px-9"
              buttonClassName={`${
                navigation.state === "submitting" ? "opacity-80" : ""
              }`}
            >
              {navigation.state === "submitting" ? "..." : "SEND"}
            </AccentButton>
          </div>
        </section>
      </div>
    </Form>
  );
}
