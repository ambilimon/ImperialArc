
export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  completion_date?: string;
  is_featured?: boolean;
  slug?: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  name: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  created_at: string;
  updated_at: string;
};

export type AboutContent = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ContactInfo = {
  id: string;
  address: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
};
