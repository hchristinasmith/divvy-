# Boilerplate: Fullstack with Sass

## Setup

### What's included

This repo includes:

* a single, simple API endpoint (`/api/v1/fruits`)
* a single React component (`<App />`)
* an example database module (`server/db/fruits.js`)
* an API client module (`client/apis/fruits.js`)
* configuration for Vitest and testing library
* configuration for server-side debugging in VS Code
* configuration for preprocessing Sass

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

#### **From the command line**

```
git clone https://github.com/dev-academy-challenges/boilerplate-fullstack [your-project-name]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack)

┌────────────────────────────┐
│         Frontend           │
│      (React / Vite)        │
│                            │
│  - View accounts           │
│  - View transactions       │
│  - Categorize transactions │
│  - Refresh button          │
└────────────┬───────────────┘
             │
             ▼
 ┌──────────────────────────┐
 │        Express API       │
 │  /api/accounts/sync      │◄── Refresh button
 │  /api/transactions/sync  │◄── Refresh button
 │  /api/transactions        │──► Fetch transactions
 │  /api/accounts            │──► Fetch accounts
 └───────┬───────────┬──────┘
         │           │
         ▼           ▼
 ┌──────────────────────────┐
 │   Akahu API (3rd party)  │
 │  GET /accounts           │
 │  GET /transactions       │
 └──────────────────────────┘
         ▲
         │
         ▼
 ┌──────────────────────────┐
 │        Knex.js           │
 │     (DB query builder)   │
 └───────┬───────────┬──────┘
         │           │
         ▼           ▼
 ┌──────────────────────────┐
 │       PostgreSQL DB      │
 │   ┌────────────────────┐ │
 │   │    transactions    │ │
 │   │  - akahu_id (unique)││
 │   │  - category (editable) │
 │   └────────────────────┘ │
 │   ┌────────────────────┐ │
 │   │     accounts       │ │
 │   │  - akahu_id (unique)││
 │   └────────────────────┘ │
 └──────────────────────────┘


Build a GET route that joins transactions with accounts

 Add category editing support via a PATCH route

 Add filtering (e.g. by account, date, category) on the frontend

 Trigger sync from the frontend with a button