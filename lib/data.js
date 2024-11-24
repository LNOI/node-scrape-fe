import { m } from "framer-motion";

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "EXPAND", uid: "expand" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columns_history_scrape = [
  { name: "ID", uid: "id", sortable: true },
  { name: "KEYWORD", uid: "keyword", sortable: true },
  { name: "GROUPS", uid: "num_groups", sortable: true },
  { name: "POSTS", uid: "num_posts", sortable: true },
  { name: "COMMENTS", uid: "num_comments", sortable: true },
  { name: "CREATED AT", uid: "created_at", sortable: true },
  { name: "DETAIL", uid: "detail_hc" },
];

export const visible_columns_history_scrape = [
  "keyword",
  "num_groups",
  "num_posts",
  "num_comments",
  "created_at",
  "detail_hc",
];

// "created_at": "2024-11-17T17:17:59.995165",
//             "updated_at": "2024-11-17T17:17:59.995170",
//             "group_id": "631ed901-cc1c-47d1-935b-fed4f6e602ec",
//             "title": "Người nhà em xách tay từ Úc mang về nhìu nên e cần pass bớt giá iu cho a/c ạ ",
//             "images": [
//               "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/467339656_2714207792096817_7032535413047848461_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=108&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=QuYhXL_4rC0Q7kNvgH2JTWy&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=A98du9TD_alegJLnRhnBTjX&oh=00_AYCHuaPuo_HKp-ZdZ8Y9qUzM1vVSHk_ZT0oaPx3TyOuWNA&oe=673F9C13"
//             ],
//             "owner_name": "Phương Vy",
//             "post_date": null,
//             "id": "111b2dff-8d78-4a25-a320-0c3ebd241e6e",
//             "deleted_at": null,
//             "user_id": "ef996218-96e6-44b2-a0e0-2ece8fcc52bb",
//             "link": "https://www.facebook.com/share/p/ooi7THPr2eHZivdT/",
//             "reaction": 0,
//             "owner_link": "https://www.facebook.com/100005228678049",
//             "hc_id": "769fc7a7-f290-4f9b-b016-f606dff9f13f",
//             "comments": [

export const columns_posts = [
  { name: "VIEW", uid: "open_post", sortable: true },
  { name: "ID", uid: "id", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "OWNER NAME", uid: "owner_name", sortable: true },
  { name: "OWNER LINK", uid: "owner_link", sortable: true },
  { name: "LINK", uid: "link", sortable: true },
  { name: "REACTION", uid: "reaction", sortable: true },
  { name: "POST DATE", uid: "post_date", sortable: true },
  { name: "CREATED AT", uid: "created_at", sortable: true },
];

export const visible_columns_posts = [
  "open_post",
  "title",
  "owner_name",
  "owner_link",
  "link",
  "reaction",
  "post_date",
  "created_at",
];

//     user_id: UUID
//     link: str
//     name: str
//     description: str | None = None
//     privacy: str  #  Công khai | Riêng tư
//     members: str  #  69K thành viên  | split  69k
//     posting_frequency: str
//     is_member: bool = False
//     user_admin: str | None = None
//     hc_id: UUID = Field(foreign_key="history_scrape.id", nullable=False)
//     hc_scrape: "HistoryScrapeModel" = Relationship(back_populates="groups")
//     posts : list["PostModel

export const columns_groups = [
  { name: "VIEW", uid: "open_group", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "MEMBERS", uid: "members", sortable: true },
  { name: "PRIVACY", uid: "privacy", sortable: true },
  { name: "POSTING FREQUENCY", uid: "posting_frequency", sortable: true },
  { name: "IS MEMBER", uid: "is_member", sortable: true },
  { name: "CREATED AT", uid: "created_at", sortable: true },
  { name: "LINK", uid: "link" },
];

export const visible_columns_groups = [
  "open_group",
  "name",
  "members",
  "privacy",
  "posting_frequency",
  "is_member",
  "created_at",
  "link",
];

// "comments": [
//               {
//                 "updated_at": "2024-11-17T17:18:13.790691",
//                 "created_at": "2024-11-17T17:18:13.790687",
//                 "post_id": "3dce1851-b6b2-4dec-b5b1-ae6ff2e0fd7b",
//                 "content": "lấy 1 thùng có ship ko",
//                 "owner_name": "Trường An An",
//                 "comment_date": "2024-11-17T17:18:13.790695",
//                 "id": "969c7d5c-2609-4f88-be78-ad718d0086d5",
//                 "deleted_at": null,
//                 "user_id": "ef996218-96e6-44b2-a0e0-2ece8fcc52bb",
//                 "images": [],
//                 "owner_link": "https://www.facebook.com/100017811542944",
//                 "hc

// post_id: UUID = Field(foreign_key="post.id")
// user_id: UUID
// content: str | None = None
// images: list[str] | None = Field(sa_column=Column(ARRAY(String)),default=[])
// owner_name: str
// owner_link: str
// comment_date: datetime = Field(default_factory=datetime.now, nullable=True)

export const columns_comments = [
  { name: "CONTENT", uid: "content", sortable: true },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "OWNER NAME", uid: "owner_name", sortable: true },
  { name: "OWNER LINK", uid: "owner_link", sortable: true },
  { name: "COMMENT DATE", uid: "comment_date", sortable: true },
  { name: "CREATED AT", uid: "created_at", sortable: true },
];

export const visible_columns_comments = [
  "content",
  "category",
  "owner_name",
  "owner_link",
  "comment_date",
  "created_at",
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export const users = [
  {
    id: 1,
    expand: true,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    expand: true,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
];

export const struct_table = [];
