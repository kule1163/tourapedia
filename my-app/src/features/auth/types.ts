export interface UserProps {
  email: string;
  firstname: string;
  lastname: string;
  token: string;
  profilePhoto: {
    url: string;
    public_id: string;
  };
  expireToken: string;
  _id: string;
}
