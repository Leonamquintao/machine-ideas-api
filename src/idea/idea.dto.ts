export interface IdeaDTO {
  tittle: string;
  description: string;
  image?: string;
  author: string;
  user_id: string;
  comments?: Array<any>;
  created_at: Date;
}
