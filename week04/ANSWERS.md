# Week 4 — Vue Components and Reactivity Answers

## 1. Why not use the array index as `:key` in EventList?
If the list is filtered, an event can move to a different array index. Vue may then reuse a component instance for a different event, causing local state such as an open details panel to appear on the wrong card. Using `:key="e.id"` keeps each component associated with its actual event.

## 2. Why is `visible` a computed instead of a function called in the template?
`visible` depends on the events, selected category, and search text, so `computed` automatically tracks those reactive dependencies and caches the result. When I type in the search box, `search` changes and Vue recalculates `visible` to update the displayed cards. A function called in the template can run again on unrelated renders, even if its inputs have not changed.

## 3. Why does EventCard emit `book` instead of changing `event.booked`? Give two reasons.
First, `event` is a prop, and a child component should not directly mutate parent-owned data. Second, the parent `App.vue` is responsible for checking remaining seats and updating both `event.booked` and `myBookings` consistently. Emitting `book` also keeps EventCard reusable as a display component.

## 4. Why does `const { booked } = reactive(event); booked++` not update the page?
Destructuring copies the current primitive number into a separate local variable, so `booked` is no longer linked to the reactive object's property. Incrementing that local variable does not update `event.booked`, and if it was declared with `const`, `booked++` also throws an assignment error. To update owned reactive state, change the property on the reactive object; when destructuring is needed, `toRefs` can preserve reactivity.

## 5. Where does `myBookings` live, and why not in EventCard or EventList?
`myBookings` lives in `App.vue`, because App owns the event data and handles bookings. EventCard only displays an event and emits `book`, while EventList handles filtering and forwards the event upward. Keeping bookings in App provides one source of truth for the header count and available seats across all cards.
