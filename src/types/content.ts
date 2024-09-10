// types/content.ts
export interface Content {
    Hero: HeroContent;
    About: AboutContent;
    Experience: ExperienceContent;
    Education: EducationContent;
    Projects: ProjectsContent;
    Languages: LanguagesContent;
    Skills: SkillsContent;
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

export interface SkillsContent {
    title: string;
}