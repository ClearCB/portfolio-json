// types/cv.ts

export interface Location {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
}

export interface Profile {
    network: string;
    username: string;
    url: string;
}

export interface WorkExperience {
    name: string;
    position: string;
    url?: string; // Optional property
    startDate: string;
    endDate: string | null; // Allowing null here
    summary: string;
    highlights: string[];
}

export interface VolunteerExperience {
    organization: string;
    position: string;
    url?: string; // Optional property
    startDate: string;
    endDate: string | null; // Allowing null here
    summary: string;
    highlights: string[];
}

export interface Education {
    institution: string;
    url?: string; // Optional property
    area: string;
    studyType: string;
    startDate: string;
    endDate: string | null; // Allowing null here
    score: string | null;
    highlights: string[];
}

export interface Award {
    title: string;
    date: string;
    awarder: string;
    summary: string;
}

export interface Certificate {
    name: string;
    date: string;
    issuer: string;
    url: string;
}

export interface Publication {
    name: string;
    publisher: string;
    releaseDate: string;
    url: string;
    summary: string;
}

export interface Skill {
    name: string;
    level: string;
    keywords: string[];
}

export interface Language {
    language: string;
    fluency: string;
}

export interface Interest {
    name: string;
    keywords: string[];
}

export interface Reference {
    name: string;
    reference: string;
}

export interface Project {
    name: string;
    isActive?: boolean; // Optional property
    description: string;
    highlights: string[];
    url: string;
    github?: string; // Optional property
}

export interface MoreAboutItem {
    title: string;
    description: string;
}

export interface CvData {
    basics: {
        name: string;
        label: string;
        image: string;
        email: string;
        phone: string;
        url: string;
        summary: string;
        location: Location;
        profiles: Profile[];
    };
    work: WorkExperience[];
    volunteers: VolunteerExperience[];
    education: Education[];
    awards: Award[];
    certificates: Certificate[];
    publications: Publication[];
    skills: Skill[];
    moreAboutMe: MoreAboutItem[];
    languages: Language[];
    interests: Interest[];
    references: Reference[];
    projects: Project[];
}
