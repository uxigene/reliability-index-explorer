# Reliability Index Explorer
Frontend Challenge by Eugeniu Marinescu

---

# Demo
https://finance.p8q.net

For convenience, a demo is available to explore and evaluate the user interface and overall user experience.

---

# Feature Checklist

- [x] Reliability Overview
- [x] Score Breakdown Visualization
- [x] Transaction Explorer
- [x] Transaction searching
- [x] Transaction filtering
- [x] Transaction sorting
- [x] Cashflow Timeline
- [x] Streaming Transaction Updates
- [x] Loading states
- [x] Empty states
- [x] API errors
- [x] Graceful degradation

---

# Engineering

- [x] React + TypeScript + Tailwind + Zustand
- [x] Automated setup
- [x] Docker support
- [x] README documentation

---

# Setup

## Docker Setup
1. Build: `docker compose build`
2. Start: `docker compose up`

## Manual Setup
1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Start: `npm run preview`

---

# Architecture notes

## Graceful degradation
The application architecture follows a Graceful Degradation methodology to improve resilience and ensure continued availability even when dependent services or APIs experience failures. Instead of allowing a failure in a single component to impact the entire application, the system is designed to continue operating with reduced functionality when certain capabilities are temporarily unavailable.

## State Management Decisions

The application uses **Zustand** for state management. The state structure is intentionally designed around objects keyed by entity IDs rather than arrays.

As the API returns data in an unsorted format, and the application does not require preserving the original ordering. Because of this, storing collections as objects (`Record<id, entity>`) provides a more efficient and practical data model.

Using ID-based objects offers several advantages:

- **Constant-time lookups (O(1))**: Searching for an item by its ID does not require iterating through the entire collection, unlike arrays where lookup is O(n).
- **Better performance with large datasets**: As the amount of data grows, direct access through object keys avoids unnecessary searching overhead.
- **Simpler updates**: Adding, updating, or removing entities can be done directly by ID without creating or filtering large arrays.
- **Clearer state normalization**: Each entity exists only once in the store, reducing duplication and making state updates more predictable.

Example structure:

```js
{
  transactions: {
    "txn_01": { id: "txn_01", amount: -5.0 },
    "txn_02": { id: "txn_02", amount: -5.0 }
  }
}
```

## Trade-offs and Limitations

I chose to use a **virtualized list** instead of traditional pagination. Although this requires loading the full dataset upfront and increases the loading speed, it provides a better user experience by enabling search, filtering, and sorting across all records. Since the data is fetched only once and cached in the store, I consider the longer initial load time to be a reasonable trade-off.

A possible improvement would be to load and render only the first page initially, then fetch the remaining data in the background. This would display content faster and improve perceived performance, at the cost of making additional requests to the server and adding some implementation complexity.


## State lifecycle Diagram
Check: `docs/diagrams/state-lifecycle-diagram.puml`

Each of the three stores (`useReliability`, `useTransactions`, `useCategories`) follows the same lifecycle, driven by a single `*Fetch` thunk. The `loaded` flag acts as a guard so route changes never refetch.
Transactions store accepts external mutations, via the `useLiveTransactions` SSE hook.

## Mobile-first approach
I followed a mobile-first approach in this project, ensuring the content is clear, readable, and easy to use on small screens. This approach helps ensure a consistent and good user experience across all devices.

## AI usage
I relied on AI only minimally for this challenge. The project was simple enough that I wanted to build it mostly on my own as a coding exercise, while keeping AI assistance limited and saving tokens where possible.

However, I do use Claude Code in my work process in a pair-programming style. I treat it as a development partner, where I remain responsible for all decisions and overall direction while using it to support implementation and speed up certain tasks. I avoid "vibe coding" approach to maintain a clear understanding of the codebase at all times.

## Technical focus
During development, I focused on writing clean code and building a solid, scalable component architecture, with strong emphasis on separation of concerns, modular design, and reusable components.

I also prioritized stability, performance, and overall user experience, ensuring the application remains reliable and responsive under different conditions.

## Discussion Topics

Discussion topics are intentionally left as open questions, as they require a deeper discussion around assumptions, trade-offs, and system design decisions.

I have already invested significant time completing the assignment and implementing the solution. Documenting detailed answers to each of these topics in the README would require additional time, while a face-to-face discussion would provide a much more effective way to explain my thought process, design considerations, and potential approaches.

I would appreciate the opportunity to discuss these topics during a follow-up interview, where we can explore the questions in detail and have a productive technical conversation.
