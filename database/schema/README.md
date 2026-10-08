# LoadBack Database Schema

LoadBack uses PostgreSQL as the primary relational database.

The database is accessed through SQLAlchemy models in:

backend/app/models/

## Entity Relationship

```text
                    ┌──────────────┐
                    │    users     │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
          ┌─────────────┐     ┌─────────────┐
          │   drivers   │     │   traders   │
          └──────┬──────┘     └──────┬──────┘
                 │                   │
                 ▼                   ▼
          ┌─────────────┐      ┌─────────────┐
          │   trucks    │      │    loads    │
          └──────┬──────┘      └──────┬──────┘
                 │                    │
                 │             ┌──────┘
                 │             ▼
                 │       ┌─────────────┐
                 └──────►│  bookings   │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │    trips    │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │  locations  │
                         └─────────────┘