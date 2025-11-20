import { useParams } from "react-router";

export default function UserProfilePage() {
  //grab the parameters from our address bar /url
  const params = useParams();

  return <h1>UserProfile ID: {params.userId}</h1>;
}
