
import { computed, ref, type Ref } from "vue";
import type { CampusEvent } from "../types";

export function useEventFilters(events: Ref<CampusEvent[]>) {
  const search = ref("");
  const category = ref("all");

  const visible = computed(() => {
    return events.value.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.value.toLowerCase().trim());

      const matchesCategory =
        category.value === "all" ||
        event.category === category.value;

      return matchesSearch && matchesCategory;
    });
  });

  return {
    search,
    category,
    visible,
  };
}
