This is a reproduction repo for the [drizzle-orm issue #1526](https://github.com/drizzle-team/drizzle-orm/issues/1526)

## Steps to reproduce

```bash
# Copy .env
cp .env.example .env
# Start mysql database via docker
docker compose up -d

# Install packages
yarn
# Generate DB
yarn db:generate
# Migrate DB
yarn db:migrate

# Start dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Clicking "Create Project" or "Create Asset" creates new entries in database and the UI updates.

Clicking "Create Collection" throws error due to missing collection_item in many relation, because the collection has no projects or assets linked to collection yet.
