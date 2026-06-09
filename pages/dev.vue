<script setup lang="ts">
import {
  IDevArticle,
  IDevCaseStudy,
  IDevEducation,
  IDevExperience,
  IDevProject,
  IDevSkill,
  IDevSocial,
  IDevVolunteer
} from "@/models"
import { useMyHead } from "~/composables"

export interface ISection {
  id: string,
  header: string,
  stateProperty: string,
  categoryDisplay?: string
}

export interface IDevState {
  devArticles: IDevArticle[]
  devCaseStudies: IDevCaseStudy[]
  devEducation: IDevEducation[]
  devExperience: IDevExperience[]
  devProjects: IDevProject[]
  devSocials: IDevSocial[]
  devSkills: IDevSkill[]
  devVolunteer: IDevVolunteer[]
}

const sectionList: ISection[] = [
  { id: "experience", header: "experience", stateProperty: "devExperience" },
  { id: "volunteer", header: "volunteer", stateProperty: "devVolunteer" },
  { id: "casestudies", header: "case studies", stateProperty: "devCaseStudies" },
  { id: "articles", header: "articles", stateProperty: "devArticles" },
  { id: "projects", header: "projects", stateProperty: "devProjects", categoryDisplay: "top" },
  { id: "education", header: "education", stateProperty: "devEducation" },
  { id: "skills", header: "skills", stateProperty: "devSkills", categoryDisplay: "inline" },
]

useMyHead("Dev", 'Makena Kong is a Senior Fullstack Engineer based in San Francisco.')

const sections = ref(sectionList)

const { data: state } = await useFetch<IDevState>('/api/dev')

provide("devState", readonly(state));
provide("devSections", readonly(sections))
</script>

<style scoped lang="css">
main {
  height: 100%;
  max-height: 100%;
  width: 100%;
  font-family: var(--font-space);
  background-color: lavenderblush;
}

.container {
  display: flex;
}

.content {
  padding: var(--space-1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  overflow-y: scroll;
}

.ai-summary-disclaimer {
  font-family: var(--font-sans);
  font-size: var(--text-xxs);
  color: gray;
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <div class="container">
      <DevSidebar />
      <div class="content"> 
        <DevSummary />
        <DevHeader />
        <DevSections />
        <p class="ai-summary-disclaimer">
          * The AI generated summary was written by myself and not by AI.
        </p>
      </div>
    </div>
  </main>
</template>