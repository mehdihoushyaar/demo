type ValueOf<T> = T[keyof T];

interface Movie {
  type: string;
  id: string;
  link_type: string;
  link_key: string;
  theme: string;
  output_type: string;
  movie_id: string;
  uid: string;
  movie_title: string;
  movie_title_en: string;
  tag_id: string;
  serial: Serial;
  watermark: boolean;
  HD: boolean;
  watch_list_action: string;
  commingsoon_txt: string;
  rel_data: RelData;
  badge: Badge;
  rate_enable: boolean;
  rate_enable_by_cnt: boolean;
  descr: string;
  cover?: string | null;
  publish_date: string;
  age_range: string;
  pic: Pic;
  rate_avrage: string;
  avg_rate_label: string;
  pro_year: string;
  imdb_rate: string;
  categories?: CategoriesEntity[] | null;
  duration: Duration;
  countries?: CountriesEntity[] | null;
  dubbed: DubbedOrSubtitle;
  subtitle: DubbedOrSubtitle;
  audio: Audio;
  language_info: LanguageInfo;
  director: string;
  last_watch?: null;
  freemium: boolean;
  position?: null;
  sid?: null;
  uuid?: null;
}

interface Serial {
  enable: boolean;
  parent_title: string;
  season_id: number;
  serial_part: string;
  part_text: string;
  season_text: string;
  last_part: string;
}

interface RelData {
  rel_type: string;
  rel_id: string;
  rel_uid?: string | null;
  rel_title?: string | null;
  rel_type_txt: string;
}

interface Badge {
  free: boolean;
  backstage: boolean;
  vision: boolean;
  hear: boolean;
  online_release: boolean;
  exclusive: boolean;
  commingsoon: boolean;
  info?: null[] | null;
}

interface Pic {
  movie_img_s: string;
  movie_img_m: string;
  movie_img_b: string;
}

interface CategoriesEntity {
  title_en: string;
  title: string;
  link_type: string;
  link_key: string;
}

interface Duration {
  value: number;
  text: string;
}

interface CountriesEntity {
  country: string;
  country_en: string;
}

interface DubbedOrSubtitle {
  enable: boolean;
  text: string;
}

interface Audio {
  languages?: string[] | null;
  isMultiLanguage: boolean;
}

interface LanguageInfo {
  flag: string;
  text: string;
}
