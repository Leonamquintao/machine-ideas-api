export interface UserDTO {
  name: string;
  email: string;
  birth?: string;
  image?: string;
  others?: any;
  created_at: Date;
}
