// types/content.ts
export interface Content {
    Hero: HeroContent;
    About: AboutContent;
    Experience: ExperienceContent;
    Education: EducationContent;
    Projects: ProjectsContent;
    Languages: LanguagesContent;
    Skills: SkillsContent;
    MoreAboutMe: MoreAboutMeContent;
    Awards: AwardsContent;
    Certificates: CertificatesContent;
    Interest: InterestContent;
    Publications: PublicationsContent;
    References: ReferencesContent;
    Volunteers: VolunteersContent;
}

export interface HeroContent {
    sendEmailTo: string;
    callTo: string;
    visitSocialNet: string;
}

export interface AboutContent {
    title: string;
}

export interface ExperienceContent {
    title: string;
}

export interface EducationContent {
    title: string;
}

export interface ProjectsContent {
    title: string;
    watchProject: string;
    watchProjectCode: string;
}

export interface LanguagesContent {
    title: string;
}

export interface MoreAboutMeContent {
    title: string;
}

export interface SkillsContent {
    title: string;
}
export interface AwardsContent {
    title: string;
}

export interface CertificatesContent {
    title: string;
}

export interface InterestContent {
    title: string;
}

export interface PublicationsContent {
    title: string;
}
export interface ReferencesContent {
    title: string;
}
export interface VolunteersContent {
    title: string;
}