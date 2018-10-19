export interface UserDTO {
  name: string;
  email: string;
  password: string;
  birth?: string;
  image?: string;
  others?: any;
  created_at: Date;
}
