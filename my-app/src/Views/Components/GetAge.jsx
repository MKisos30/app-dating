import React from "react";
import { useAge } from "../../useAge";

const GetAge = ({ user }) => {
  const age = useAge(user.dateOfBirth);

  return <div>{age}</div>;
};

export default GetAge;
