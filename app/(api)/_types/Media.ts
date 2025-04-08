interface Media {
  _id: string | null;
  cloudinary_id: string | null;
  name: string;
  type: string;
  format: string;
  src: string;
  alt?: string;
  size: number;
  width: number | null;
  height: number | null;
  created_at?: string | null;
  last_modified?: string | null;
}

export type MediaInput = {
  cloudinary_id: string | null;
  name: string;
  type: string;
  format: string;
  src: string;
  alt?: string;
  size: number;
  width: number | null;
  height: number | null;
  created_at?: string | null;
  last_modified?: string | null;
};

export default Media;
