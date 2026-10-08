import sys
from pathlib import Path
from datetime import datetime, timezone, timedelta

# Add backend directory to Python path
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "backend"))

from app.database import SessionLocal
from app.models.user import User
from app.models.driver import Driver
from app.models.truck import Truck
from app.models.trader import Trader
from app.models.load import Load
from app.auth.password import hash_password


def seed_database():
    db = SessionLocal()

    try:
        # -------------------------------------------------
        # 1. DEMO DRIVER USER
        # -------------------------------------------------

        driver_user = (
            db.query(User)
            .filter(User.phone == "9000000001")
            .first()
        )

        if not driver_user:
            driver_user = User(
                name="Demo Driver",
                phone="9000000001",
                password_hash=hash_password("Demo123"),
                role="driver",
                language="en",
                is_active=True,
            )

            db.add(driver_user)
            db.commit()
            db.refresh(driver_user)

        # -------------------------------------------------
        # 2. DRIVER PROFILE
        # -------------------------------------------------

        driver = (
            db.query(Driver)
            .filter(Driver.user_id == driver_user.id)
            .first()
        )

        if not driver:
            driver = Driver(
                user_id=driver_user.id,
                license_number="KA25DEMO1234",
                preferred_route="Hubballi - Bengaluru",
                trust_score=85.0,
                completed_trips=12,
            )

            db.add(driver)
            db.commit()
            db.refresh(driver)

        # -------------------------------------------------
        # 3. DEMO TRUCK
        # -------------------------------------------------

        truck = (
            db.query(Truck)
            .filter(
                Truck.vehicle_number == "KA25DEMO001"
            )
            .first()
        )

        if not truck:
            truck = Truck(
                driver_id=driver.id,
                vehicle_number="KA25DEMO001",
                vehicle_type="open",
                capacity_tons=16.0,
                available=True,
            )

            db.add(truck)
            db.commit()
            db.refresh(truck)

        # -------------------------------------------------
        # 4. DEMO TRADER USER
        # -------------------------------------------------

        trader_user = (
            db.query(User)
            .filter(User.phone == "9000000002")
            .first()
        )

        if not trader_user:
            trader_user = User(
                name="Demo Trader",
                phone="9000000002",
                password_hash=hash_password("Demo123"),
                role="trader",
                language="en",
                is_active=True,
            )

            db.add(trader_user)
            db.commit()
            db.refresh(trader_user)

        # -------------------------------------------------
        # 5. TRADER PROFILE
        # -------------------------------------------------

        trader = (
            db.query(Trader)
            .filter(Trader.user_id == trader_user.id)
            .first()
        )

        if not trader:
            trader = Trader(
                user_id=trader_user.id,
                business_name="Hubballi Fresh Produce",
                business_type="Agricultural Trader",
            )

            db.add(trader)
            db.commit()
            db.refresh(trader)

        # -------------------------------------------------
        # 6. DEMO LOAD
        # -------------------------------------------------

        existing_load = (
            db.query(Load)
            .filter(
                Load.trader_id == trader.id,
                Load.cargo_type == "Tomatoes",
                Load.pickup_city == "Hubballi",
                Load.drop_city == "Bengaluru",
            )
            .first()
        )

        if not existing_load:
            load = Load(
                trader_id=trader.id,
                cargo_type="Tomatoes",
                weight_tons=8.0,

                pickup_city="Hubballi",
                pickup_lat=15.3647,
                pickup_lng=75.1240,

                drop_city="Bengaluru",
                drop_lat=12.9716,
                drop_lng=77.5946,

                pickup_time=(
                    datetime.now(timezone.utc)
                    + timedelta(days=1)
                ),

                offered_price=18000,
                vehicle_type_required="open",
                status="OPEN",
            )

            db.add(load)

        # -------------------------------------------------
        # 7. SAVE
        # -------------------------------------------------

        db.commit()

        print()
        print("=" * 60)
        print("LoadBack demo database seeded successfully.")
        print("=" * 60)

        print()
        print("DEMO DRIVER")
        print("-" * 30)
        print("Phone    : 9000000001")
        print("Password : Demo123")

        print()
        print("DEMO TRADER")
        print("-" * 30)
        print("Phone    : 9000000002")
        print("Password : Demo123")

        print()
        print("DEMO LOAD")
        print("-" * 30)
        print("Cargo    : Tomatoes")
        print("Weight   : 8 tons")
        print("Route    : Hubballi -> Bengaluru")
        print("Price    : Rs. 18,000")
        print("Status   : OPEN")

        print()
        print("Synthetic/demo data only.")
        print()

    except Exception as e:
        db.rollback()
        print("Database seeding failed.")
        print(f"Error: {e}")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()