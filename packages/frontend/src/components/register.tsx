import React, { useCallback, useState } from "react";

import { RegisterFlatInput } from "../graphql/generated";
import { RegisterFlat } from "./register-flat";
import { RegisterUser } from "./register-user";

type Step = "userData" | "flat";

type RegisterProps = {
  submit: () => void;
};

export const Register: React.FC<RegisterProps> = ({ submit }) => {
  const [step, setStep] = useState<Step>("userData");

  const registerFlat = useCallback(() => {
    submit();
  }, []);

  return (
    <div>
      {step === "userData" && <RegisterUser submit={() => setStep("flat")} />}

      {step === "flat" && <RegisterFlat submit={registerFlat} />}
    </div>
  );
};
