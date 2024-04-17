<script lang="ts">
import {
  IDevArticle,
  IDevEducation,
  IDevExperience,
  IDevProject,
  IDevSkill,
  IDevSocial,
  IDevVolunteer,
  ISortable
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
  { id: "articles", header: "articles", stateProperty: "devArticles" },
  { id: "projects", header: "projects", stateProperty: "devProjects", categoryDisplay: "top" },
  { id: "education", header: "education", stateProperty: "devEducation" },
  { id: "skills", header: "skills", stateProperty: "devSkills", categoryDisplay: "inline" },
]

const stateList: IDevState = {
  devArticles: [] as IDevArticle[],
  devEducation: [] as IDevEducation[],
  devExperience: [] as IDevExperience[],
  devProjects: [] as IDevProject[],
  devSocials: [] as IDevSocial[],
  devSkills: [] as IDevSkill[],
  devVolunteer: [] as IDevVolunteer[],
}

function sortDesc(a: ISortable, b: ISortable) {
  return b.sort - a.sort
}

export default {
  setup() {
    useMyHead("dev", 'makena kong is a full stack engineer based in san francisco')

    const sections = ref(sectionList)

    const state = reactive(stateList)

    const update = (property: string, value: any) => {
      state[property as keyof typeof state] = value
    }

    async function fetchAndSetValues() {
      const data = await $fetch<IDevState>('/api/dev')
      update("devSocials", (data as any).devSocials.sort(sortDesc))
      sections.value.forEach((section) => {
        const property = section.stateProperty
        update(property, (data as any)[property].sort(sortDesc))
      })
    }

    onMounted(fetchAndSetValues)

    provide("devState", readonly(state));
    provide("devUpdate", update)
    provide("devSections", readonly(sections))

    return { state, update, sections }
  }
}
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
</style>

<template>
  <main>
    <NavBar />
    <div class="container">
      <DevSidebar />
      <div class="content">
        <DevHeader />
        <DevSections />
      </div>
    </div>
  </main>
</template>