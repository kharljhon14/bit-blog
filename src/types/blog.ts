export interface Blog {
  id: string;
  user_id: string;
  content: string;
  title: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}
