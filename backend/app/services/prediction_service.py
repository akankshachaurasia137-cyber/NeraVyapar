from pathlib import Path
import sys
import joblib
import pandas as pd

from ..utils.distance import city_distance_km


# ============================================================
# PROJECT ROOT
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


# ============================================================
# ML MODEL
# ============================================================

MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "empty_return_model.pkl"

_model = None


def get_empty_return_model():
    """
    Load the trained Random Forest model once.
    """

    global _model

    if _model is None:

        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Empty-return model not found at: {MODEL_PATH}"
            )

        _model = joblib.load(MODEL_PATH)

    return _model


# ============================================================
# EMPTY RETURN PREDICTION
# ============================================================

def empty_return_prediction(
    current_city,
    destination_city,
    days_until_available,
    capacity_tons
):
    """
    Predict the probability that a truck will return empty.

    Uses the trained ML model from:
        ml/models/empty_return_model.pkl
    """

    distance = city_distance_km(
        current_city,
        destination_city
    )

    # --------------------------------------------------------
    # Features expected by the trained ML model
    # --------------------------------------------------------
    truck_data = pd.DataFrame([{
        "truck_capacity": capacity_tons,
        "distance_km": distance,

        # Current backend API does not yet provide these fields.
        # We use reasonable MVP defaults.
        "vehicle_type": "Open",
        "destination": destination_city,
        "cargo_type": "General",
        "day_of_week": "Friday",
        "season": "Normal",
        "available_loads": 2,
        "demand_level": "Low",
        "historical_route_success": 0.40
    }])

    model = get_empty_return_model()

    # Prediction
    prediction = int(model.predict(truck_data)[0])

    # Probability of class 1 = empty return
    probability = float(
        model.predict_proba(truck_data)[0][1]
    )

    # Risk level
    if probability >= 0.70:
        risk_level = "HIGH"
        recommended_action = "Find return load now"

    elif probability >= 0.40:
        risk_level = "MEDIUM"
        recommended_action = "Consider booking a return load"

    else:
        risk_level = "LOW"
        recommended_action = "Return-load risk is relatively low"

    return {
        "empty_return_prediction": prediction,
        "empty_return_probability": round(probability, 3),
        "distance_km": distance,
        "risk_level": risk_level,
        "recommended_action": recommended_action
    }


# ============================================================
# DEMAND PREDICTION
# ============================================================

def demand_prediction(
    origin,
    destination,
    cargo_type,
    day_of_week
):
    """
    Existing rule-based demand prediction.

    We keep this for now because the project does not
    currently have a real demand-training dataset.
    """

    base = {
        "onion": 0.78,
        "potato": 0.72,
        "tomato": 0.69,
        "general": 0.55
    }.get(cargo_type.lower(), 0.5)

    weekend = 0.08 if day_of_week in (5, 6) else 0

    score = min(0.98, base + weekend)

    return {
        "demand_score": round(score, 3),
        "demand_level": (
            "HIGH"
            if score > 0.7
            else "MEDIUM"
            if score > 0.45
            else "LOW"
        ),
        "origin": origin,
        "destination": destination,
        "cargo_type": cargo_type
    }