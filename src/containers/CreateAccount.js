import React from "react";
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({ CreateAccountFunction }) {
  return (
    <div className="Title">
      <h1>Create Account</h1>
      <CreateAccountForm CreateAccountFunction={CreateAccountFunction} />
    </div>
  );
}

export default CreateAccount;
