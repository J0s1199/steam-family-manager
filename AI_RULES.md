# AI Rules for Steam Family Manager Application

This document outlines the technical stack and guidelines for developing features within the Steam Family Manager application.

## Tech Stack Overview

*   **Frontend Framework:** React (version ^19.2.3) for building the user interface.
*   **Language:** TypeScript (~5.8.2) for type safety and improved code quality.
*   **Styling:** Tailwind CSS for utility-first styling. All styling should be done using Tailwind classes.
*   **Charting Library:** Recharts (version ^3.6.0) for data visualization (e.g., bar charts, pie charts).
*   **Build Tool:** Vite (version ^6.2.0) for fast development and optimized builds.
*   **Icons:** Font Awesome (via CDN) for scalable vector icons.
*   **State Management:** React's built-in `useState` and `useMemo` hooks for managing component and application state.
*   **Persistence:** Browser's `localStorage` for client-side data storage.
*   **Avatar Generation:** DiceBear API for generating user avatars.
*   **UI Components:** shadcn/ui components are available and preferred for building UI elements.

## Library Usage Rules

*   **React:** Always use React for creating components and managing the UI.
*   **TypeScript:** All new and modified code should be written in TypeScript, adhering to strict typing.
*   **Tailwind CSS:**
    *   **Mandatory:** All styling must be implemented using Tailwind CSS utility classes.
    *   **Prohibited:** Avoid custom CSS files (`.css`, `.scss`) or other CSS-in-JS solutions unless absolutely necessary and explicitly approved.
    *   **Responsive Design:** Always prioritize responsive design using Tailwind's responsive prefixes (e.g., `sm:`, `md:`, `lg:`).
*   **Recharts:** Use Recharts for any data visualization requirements. Do not introduce other charting libraries.
*   **Font Awesome:** For icons, use Font Awesome classes as demonstrated in the existing codebase.
*   **State Management:** Stick to React's `useState`, `useReducer`, `useContext`, and `useMemo` for state management. Do not introduce external state management libraries unless the complexity explicitly warrants it and is approved.
*   **Routing:** If routing is required, use React Router. Keep route definitions in `src/App.tsx`.
*   **UI Components:**
    *   **shadcn/ui:** Leverage pre-built components from `shadcn/ui` whenever possible for common UI elements (buttons, forms, dialogs, etc.).
    *   **Radix UI:** Radix UI primitives are available and can be used as a foundation for custom components if `shadcn/ui` does not offer a suitable option.
    *   **Custom Components:** Create new, small, and focused components in `src/components/` for reusable UI elements not covered by `shadcn/ui` or Radix UI.
*   **File Structure:**
    *   `src/pages/`: For top-level views/pages.
    *   `src/components/`: For reusable UI components.
    *   `src/utils/`: For utility functions.
    *   `src/types.ts`: For shared TypeScript interfaces and types.
*   **No Over-engineering:** Focus on implementing the requested features simply and elegantly. Avoid adding complex error handling, fallback mechanisms, or unnecessary abstractions unless specifically requested.
*   **Complete Implementations:** All features must be fully functional and complete. No placeholders, partial implementations, or `TODO` comments should be left in the final code.
*   **Error Handling:** Do not implement `try/catch` blocks for error handling unless explicitly requested. Errors should bubble up for easier debugging and resolution.