import { useAge } from "../../useAge";

const GetAge = ({ user }) => {
  const age = useAge(user.dateOfBirth);

  return <>{age}</>;
};

export default GetAge;
