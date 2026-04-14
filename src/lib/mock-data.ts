import projectCover1 from "@/assets/project-cover-1.jpg";
import projectCover2 from "@/assets/project-cover-2.jpg";
import projectCover3 from "@/assets/project-cover-3.jpg";
import eventCover from "@/assets/event-cover.jpg";

// Roles are now open-ended strings — presets provided for convenience
export type UserRole = string;
export type AvailabilityStatus = "available" | "limited" | "busy";
export type ProjectStatus = "draft" | "seeking_collaborators" | "active" | "completed";
export type ProjectType = "shoot" | "collection" | "lookbook" | "editorial" | string;
export type InviteStatus = "pending" | "accepted" | "declined";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  custom_roles: string[];
  account_type: "creative" | "consumer";
  bio: string;
  location: string;
  profile_image: string;
  availability_status: AvailabilityStatus;
  open_to_collaborations: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  project_type: ProjectType;
  location: string;
  shoot_date: string;
  status: ProjectStatus;
  creator_id: string;
  created_at: string;
  cover_image: string;
  collaborators: ProjectCollaborator[];
  images: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  image_type: "moodboard" | "final";
}

export interface ProjectCollaborator {
  id: string;
  project_id: string;
  user_id: string;
  role: UserRole;
  invite_status: InviteStatus;
  user?: User;
}

export interface FashionEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  event_type: string;
  external_link: string;
  cover_image: string;
  source?: "manual" | "instagram" | "tiktok";
}

export interface Moodboard {
  id: string;
  title: string;
  description: string;
  creator_id: string;
  is_private: boolean;
  shared_with: string[]; // user IDs
  images: string[];
  created_at: string;
}

// Preset roles — users can also type custom ones
export const PRESET_ROLES: string[] = [
  "Designer",
  "Photographer",
  "Stylist",
  "Model",
  "Makeup Artist",
  "Creative Director",
  "Set Designer",
  "Illustrator",
  "Textile Artist",
  "Pattern Cutter",
];

// Keep backward compat
export const ROLES = PRESET_ROLES;

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Elena Vasquez",
    email: "elena@atelier.com",
    role: "Designer",
    custom_roles: ["Designer", "Textile Artist"],
    account_type: "creative",
    bio: "London-based fashion designer exploring the intersection of sculptural form and wearable art. CSM graduate.",
    location: "Hackney, London",
    profile_image: "",
    availability_status: "available",
    open_to_collaborations: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus@atelier.com",
    role: "Photographer",
    custom_roles: ["Photographer", "Creative Director"],
    account_type: "creative",
    bio: "Editorial and fashion photographer. Published in Dazed, i-D, and AnOther.",
    location: "Shoreditch, London",
    profile_image: "",
    availability_status: "limited",
    open_to_collaborations: true,
    created_at: "2024-02-01",
  },
  {
    id: "3",
    name: "Amara Osei",
    email: "amara@atelier.com",
    role: "Stylist",
    custom_roles: ["Stylist"],
    account_type: "creative",
    bio: "Fashion stylist working across editorial, commercial, and personal styling. Focused on emerging London designers.",
    location: "Peckham, London",
    profile_image: "",
    availability_status: "available",
    open_to_collaborations: true,
    created_at: "2024-02-10",
  },
  {
    id: "4",
    name: "Suki Tanaka",
    email: "suki@atelier.com",
    role: "Model",
    custom_roles: ["Model"],
    account_type: "creative",
    bio: "Freelance model. Represented by Storm Management.",
    location: "Dalston, London",
    profile_image: "",
    availability_status: "busy",
    open_to_collaborations: false,
    created_at: "2024-03-01",
  },
  {
    id: "5",
    name: "Priya Sharma",
    email: "priya@atelier.com",
    role: "Makeup Artist",
    custom_roles: ["Makeup Artist", "Set Designer"],
    account_type: "creative",
    bio: "Makeup artist specialising in editorial and avant-garde beauty. MAC Pro Team.",
    location: "Brixton, London",
    profile_image: "",
    availability_status: "available",
    open_to_collaborations: true,
    created_at: "2024-03-05",
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Nocturne",
    description: "An editorial shoot exploring the duality of shadow and silhouette in contemporary tailoring. Shot on location across East London's brutalist architecture.",
    project_type: "editorial",
    location: "Barbican, London",
    shoot_date: "2024-04-15",
    status: "completed",
    creator_id: "1",
    created_at: "2024-03-01",
    cover_image: projectCover1,
    collaborators: [
      { id: "c1", project_id: "1", user_id: "1", role: "Designer", invite_status: "accepted", user: mockUsers[0] },
      { id: "c2", project_id: "1", user_id: "2", role: "Photographer", invite_status: "accepted", user: mockUsers[1] },
      { id: "c3", project_id: "1", user_id: "3", role: "Stylist", invite_status: "accepted", user: mockUsers[2] },
      { id: "c4", project_id: "1", user_id: "4", role: "Model", invite_status: "accepted", user: mockUsers[3] },
    ],
    images: [],
  },
  {
    id: "2",
    title: "Soft Structure",
    description: "A lookbook for an emerging knitwear collection that blurs the line between garment and sculpture. Seeking a photographer and model for a studio shoot.",
    project_type: "lookbook",
    location: "Hackney Wick, London",
    shoot_date: "2024-05-20",
    status: "seeking_collaborators",
    creator_id: "1",
    created_at: "2024-04-01",
    cover_image: projectCover2,
    collaborators: [
      { id: "c5", project_id: "2", user_id: "1", role: "Designer", invite_status: "accepted", user: mockUsers[0] },
      { id: "c6", project_id: "2", user_id: "3", role: "Stylist", invite_status: "accepted", user: mockUsers[2] },
    ],
    images: [],
  },
  {
    id: "3",
    title: "Urban Armour",
    description: "Street-cast editorial capturing London's underground fashion scene. Raw, unfiltered, real.",
    project_type: "shoot",
    location: "Elephant & Castle, London",
    shoot_date: "2024-06-10",
    status: "active",
    creator_id: "2",
    created_at: "2024-05-01",
    cover_image: projectCover3,
    collaborators: [
      { id: "c7", project_id: "3", user_id: "2", role: "Photographer", invite_status: "accepted", user: mockUsers[1] },
      { id: "c8", project_id: "3", user_id: "5", role: "Makeup Artist", invite_status: "pending", user: mockUsers[4] },
    ],
    images: [],
  },
];

export const mockMoodboards: Moodboard[] = [
  {
    id: "1",
    title: "SS26 Colour Research",
    description: "Earthy tones, raw textures, undyed fabrics",
    creator_id: "1",
    is_private: true,
    shared_with: [],
    images: [projectCover1, projectCover2],
    created_at: "2024-04-10",
  },
  {
    id: "2",
    title: "Nocturne References",
    description: "Brutalist architecture meets draped fabric",
    creator_id: "1",
    is_private: false,
    shared_with: ["2", "3"],
    images: [projectCover3, projectCover1],
    created_at: "2024-03-15",
  },
];

export const mockEvents: FashionEvent[] = [
  {
    id: "1",
    name: "London Fashion Week SS26",
    date: "2026-09-15",
    location: "The Strand, London",
    event_type: "Fashion Week",
    external_link: "https://londonfashionweek.co.uk",
    cover_image: eventCover,
    source: "manual",
  },
  {
    id: "2",
    name: "Graduate Fashion Week",
    date: "2026-06-08",
    location: "Old Truman Brewery, London",
    event_type: "Graduate Show",
    external_link: "https://graduatefashionweek.com",
    cover_image: eventCover,
    source: "instagram",
  },
  {
    id: "3",
    name: "Fashion Open Studio",
    date: "2026-05-20",
    location: "Various Locations, London",
    event_type: "Open Studio",
    external_link: "#",
    cover_image: eventCover,
    source: "manual",
  },
  {
    id: "4",
    name: "Emerging Designers Showcase",
    date: "2026-07-12",
    location: "Somerset House, London",
    event_type: "Exhibition",
    external_link: "#",
    cover_image: eventCover,
    source: "tiktok",
  },
];

export const currentUser = mockUsers[0];
