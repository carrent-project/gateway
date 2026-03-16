# CarRent API Gateway
### Application purposed to rent car

API Gateway for the car rental application. Single entry point for all clients.

## 📦 Project structure

## 🚀 Quick Start

### 1. Clone all repositories

```bash
mkdir carrent && cd carrent
git clone https://github.com/carrent-project/gateway.git
git clone https://github.com/carrent-project/auth-service.git
git clone https://github.com/carrent-project/shared.git

cd shared
npm install

# compile shared DTOs
npm run build

cd ../auth-service
npm install

cd ../gateway
npm install

# Start PostgreSQL
cd auth-service
docker-compose up -d
```

## Run microservice and gateway

```bash
# Terminal 1 (auth-service):
cd auth-service
npm run dev

# Terminal 2 (gateway):
cd gateway
npm run dev
```

[Open API documentation](http://localhost:5000/api)