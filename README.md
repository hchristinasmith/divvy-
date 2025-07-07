# Divvy - Personal Finance Management App

## Features

### Dashboard
- **Account Overview**: View and select multiple bank accounts
- **Spending Breakdown**: Visualize your spending patterns by category
- **Time Filtering**: Filter financial data by different time periods (7 days, 30 days, etc.)
- **Monthly Overview**: Compare actual spending against budget targets
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing

### Transaction Management
- **Transaction Listing**: View all your financial transactions in one place
- **Search Functionality**: Find specific transactions by keywords
- **Category Filtering**: Filter transactions by category
- **Transaction Details**: View comprehensive information about each transaction
- **Category Management**: Assign and edit transaction categories

### Financial Targets
- **Budget Tracking**: Set and monitor spending targets by category
- **Progress Visualization**: See visual progress bars showing budget usage
- **Status Indicators**: Get clear status indicators (On Track, Watch, Close, Over Target)
- **Budget Summaries**: View total budgeted, spent, and remaining amounts
- **Target Creation**: Create new financial targets for different categories

### Subscription Management
- **Subscription Tracking**: Monitor all your recurring subscriptions in one place
- **Cost Analysis**: See monthly and yearly subscription costs
- **Billing Alerts**: Get notifications for upcoming subscription renewals
- **Subscription Details**: View comprehensive information about each subscription
- **Search & Filter**: Find subscriptions by name or category

### Authentication
- **User Profiles**: Secure user accounts with profile management
- **Authentication**: Secure login and account management

### Additional Features
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Updates**: Sync with your financial data using Akahu API

## Architecture
The application follows a modern full-stack architecture:

┌────────────────────────────┐
│         Frontend           │
│      (React / Vite)        │
│                            │
│  - View accounts           │
│  - View transactions       │
│  - Categorize transactions │
│  - Manage subscriptions    │
│  - Set financial targets   │
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

## Setup

### Installation

```
git clone [your-repository-url]
cd [your-project-name]
npm install
npm run dev
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

## Technologies Used
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Express, Node.js
- **Database**: PostgreSQL with Knex.js
- **Authentication**: Auth0 (or your authentication provider)
- **Third-party APIs**: Akahu API for financial data