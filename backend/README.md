# Pasè FX Backend API

Professional trading platform backend built with Express.js, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication**: JWT-based authentication with refresh tokens
- **User Management**: Role-based access control (Admin, Analyst, Moderator, User)
- **Trading Signals**: Create, manage, and track trading signals
- **Portfolio Management**: Track trading performance and statistics
- **Trade Journal**: Record and analyze trades
- **Market Data**: Real-time forex and crypto data
- **Notifications**: User notification system

## 🛠 Tech Stack

- **Runtime**: Node.js + Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator
- **Testing**: Vitest

## 📦 Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and API keys

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npx prisma db seed

# Start development server
npm run dev
```

## 🔑 Environment Variables

```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/pasefx_db"
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d
COINGECKO_API_KEY=your-coingecko-api-key
EXCHANGERATE_API_KEY=your-exchangerate-api-key
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Signals
- `GET /api/signals` - Get all signals
- `GET /api/signals/:id` - Get signal by ID
- `POST /api/signals` - Create signal (Admin/Analyst only)
- `PATCH /api/signals/:id/close` - Close signal (Admin/Analyst only)
- `POST /api/signals/:id/like` - Like/unlike signal

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user profile
- `PATCH /api/users/:id/role` - Update user role (Admin only)
- `PATCH /api/users/:id/status` - Update user status (Admin only)

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `PATCH /api/portfolio/balance` - Update balance
- `POST /api/portfolio/trade` - Record trade
- `GET /api/portfolio/stats` - Get portfolio statistics

### Trade Journal
- `GET /api/journal` - Get all journal entries
- `GET /api/journal/:id` - Get journal entry by ID
- `POST /api/journal` - Create journal entry
- `PATCH /api/journal/:id` - Update journal entry
- `PATCH /api/journal/:id/close` - Close journal entry
- `DELETE /api/journal/:id` - Delete journal entry
- `GET /api/journal/stats/overview` - Get journal statistics

### Market Data
- `GET /api/market/forex` - Get forex rates
- `GET /api/market/crypto` - Get cryptocurrency data
- `GET /api/market/crypto/:id` - Get specific coin data
- `GET /api/market/overview` - Get market overview

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `POST /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage
```

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database

## 🔐 Default Users

After seeding, you can log in with:

- **Admin**: admin@pasefx.com / admin123
- **Analyst**: analyst@pasefx.com / analyst123
- **User**: user@pasefx.com / user123

## 📄 License

MIT License
