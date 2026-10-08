# LoadBack Database Migrations

This folder is reserved for database migration files for the LoadBack backend.

## Purpose

Database migrations are used to safely track changes to the PostgreSQL database schema as the LoadBack application evolves.

The current MVP uses SQLAlchemy models defined inside:

```text
backend/app/models/