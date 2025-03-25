
export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image_url: string;
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
