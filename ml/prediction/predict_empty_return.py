import pandas as pd
import joblib
from pathlib import Path


# -----------------------------------------
# 1. FIND PROJECT FOLDER
# -----------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]


# -----------------------------------------
# 2. LOAD TRAINED MODEL
# -----------------------------------------

MODEL_PATH = BASE_DIR / "ml" / "models" / "empty_return_model.pkl"

model = joblib.load(MODEL_PATH)

print("Model loaded successfully!")


# -----------------------------------------
# 3. NEW TRUCK
# -----------------------------------------

truck = pd.DataFrame([{

    "truck_capacity": 12,

    "distance_km": 350,

    "vehicle_type": "Open",

    "destination": "Bengaluru",

    "cargo_type": "Onion",

    "day_of_week": "Friday",

    "season": "Normal",

    "available_loads": 2,

    "demand_level": "Low",

    "historical_route_success": 0.40

}])


# -----------------------------------------
# 4. PREDICT
# -----------------------------------------

prediction = model.predict(truck)[0]

probability = model.predict_proba(truck)[0][1]


# -----------------------------------------
# 5. DETERMINE RISK
# -----------------------------------------

if probability >= 0.70:

    risk = "HIGH"

    recommendation = (
        "Book a return load before departure"
    )

elif probability >= 0.40:

    risk = "MEDIUM"

    recommendation = (
        "Consider booking a return load"
    )

else:

    risk = "LOW"

    recommendation = (
        "Return-load risk is relatively low"
    )


# -----------------------------------------
# 6. DISPLAY RESULT
# -----------------------------------------

print("\n==============================")
print("NERA VYAPAR - ML PREDICTION")
print("==============================")

print("\nTruck Information:")
print(truck.to_string(index=False))

print("\nEmpty Return Probability:")
print(round(probability * 100, 2), "%")

print("\nRisk:")
print(risk)

print("\nPrediction:")

if prediction == 1:
    print("Truck is likely to return EMPTY")
else:
    print("Return load is likely to be FOUND")

print("\nRecommendation:")
print(recommendation)