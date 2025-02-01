# Multilingual FAQ Management System

## Project Overview
A Node.js-based multilingual FAQ management system with advanced translation and caching capabilities.

## Features
- Multilingual FAQ support
- Automatic translation
- Redis caching
- RESTful API
- Docker support

## Prerequisites
- Node.js (v16+)
- MongoDB
- Redis
- Google Cloud Translation API credentials

## Installation

### Local Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set environment variables:
```bash
cp .env.example .env
# Update with your credentials
```

4. Run the application:
```bash
npm run dev
```

## Docker Deployment
```bash
docker-compose up --build
```

## API Endpoints
- `POST /api/faqs`: Create FAQ
- `GET /api/faqs?lang=en`: Retrieve FAQs (language optional)

## Testing
```bash
npm test
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit with conventional commits
4. Push and create pull request

## License
MIT License