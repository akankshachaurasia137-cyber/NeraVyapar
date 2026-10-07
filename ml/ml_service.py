import sys
from pathlib import Path

import pandas as pd
import joblib


# ============================================================
# PROJECT PATH
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[1]
ML_DIR = BASE_DIR / "ml"

sys.path.append(str(ML_DIR))


# ============================================================
# IMPORT ML COMPONENTS
# ============================================================

from matching.match_engine import match_loads
from pricing.fair_price import calculate_fair_price
from route_risk.route_risk import calculate_route_risk
from load_pooling.load_pooling import find_load_combinations
from multi_hop.multi_hop import find_best_route


# ============================================================
# LOAD EMPTY RETURN MODEL
# ============================================================

MODEL_PATH = ML_DIR / "models" / "empty_return_model.pkl"

empty_return_model = joblib.load(MODEL_PATH)


# ============================================================
# EMPTY RETURN PREDICTION
# ============================================================

def predict_empty_return(truck):

    df = pd.DataFrame([truck])

    prediction = empty_return_model.predict(df)[0]

    probability = empty_return_model.predict_proba(df)[0][1]

    if probability >= 0.70:
        risk = "HIGH"
        recommendation = "Book a return load before departure"

    elif probability >= 0.40:
        risk = "MEDIUM"
        recommendation = "Consider booking a return load"

    else:
        risk = "LOW"
        recommendation = "Return-load risk is relatively low"

    return {
        "prediction": int(prediction),
        "empty_return_probability": round(float(probability), 4),
        "risk": risk,
        "recommendation": recommendation
    }


# ============================================================
# COMPLETE TRUCK ANALYSIS
# ============================================================

def analyze_truck(truck, loads, routes):

    # --------------------------------------------------------
    # 1. Empty return prediction
    # --------------------------------------------------------

    empty_return = predict_empty_return(truck)


    # --------------------------------------------------------
    # 2. Load matching
    # --------------------------------------------------------

    ranked_loads = match_loads(
        truck["truck_capacity"],
        truck["destination"],
        truck["distance_km"],
        loads
    )


    # --------------------------------------------------------
    # 3. Fair price
    # --------------------------------------------------------

    fair_price = calculate_fair_price(
        truck["distance_km"],
        truck["vehicle_type"],
        truck["demand_level"]
    )


    # --------------------------------------------------------
    # 4. Route risk
    # --------------------------------------------------------

    route_risk = calculate_route_risk(
        truck["distance_km"],
        truck["historical_route_success"],
        truck["available_loads"],
        truck["demand_level"]
    )


    # --------------------------------------------------------
    # 5. Load pooling
    # --------------------------------------------------------

    load_pooling = find_load_combinations(
        truck["truck_capacity"],
        loads
    )


    # --------------------------------------------------------
    # 6. Multi-hop route
    # --------------------------------------------------------

    multi_hop = find_best_route(routes)


    # --------------------------------------------------------
    # Combined result
    # --------------------------------------------------------

    return {
        "empty_return": empty_return,
        "ranked_loads": ranked_loads,
        "fair_price": fair_price,
        "route_risk": route_risk,
        "load_pooling": load_pooling,
        "multi_hop": multi_hop
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    # ========================================================
    # TRUCK
    # ========================================================

    truck = {
        "truck_capacity": 12,
        "distance_km": 410,
        "vehicle_type": "Open",
        "destination": "Bengaluru",
        "cargo_type": "Onion",
        "day_of_week": "Friday",
        "season": "Normal",
        "available_loads": 2,
        "demand_level": "Low",
        "historical_route_success": 0.40
    }


    # ========================================================
    # AVAILABLE LOADS
    #
    # IMPORTANT:
    # load_pooling.py expects "weight"
    # ========================================================

    loads = [

        {
            "id": "L001",
            "destination": "Bengaluru",
            "required_capacity": 12,
            "weight": 12,
            "available": True,
            "price": 18000
        },

        {
            "id": "L002",
            "destination": "Mysuru",
            "required_capacity": 10,
            "weight": 10,
            "available": True,
            "price": 16500
        },

        {
            "id": "L003",
            "destination": "Belagavi",
            "required_capacity": 5,
            "weight": 5,
            "available": True,
            "price": 9000
        },

        {
            "id": "L004",
            "destination": "Pune",
            "required_capacity": 8,
            "weight": 8,
            "available": True,
            "price": 20000
        }
    ]


    # ========================================================
    # POSSIBLE ROUTES
    # ========================================================

    routes = [

        {
            "name": "Hubballi → Bengaluru",

            "stops": [
                {
                    "revenue": 18000,
                    "distance": 410
                }
            ]
        },

        {
            "name": "Hubballi → Belagavi → Pune",

            "stops": [
                {
                    "revenue": 7000,
                    "distance": 110
                },
                {
                    "revenue": 14000,
                    "distance": 350
                }
            ]
        },

        {
            "name": "Hubballi → Hyderabad",

            "stops": [
                {
                    "revenue": 19000,
                    "distance": 430
                }
            ]
        }
    ]


    # ========================================================
    # RUN COMPLETE ANALYSIS
    # ========================================================

    result = analyze_truck(
        truck,
        loads,
        routes
    )


    # ========================================================
    # DISPLAY RESULTS
    # ========================================================

    print()
    print("=" * 60)
    print("              NERA VYAPAR ML SERVICE")
    print("=" * 60)


    # --------------------------------------------------------
    # 1. Empty return
    # --------------------------------------------------------

    print()
    print("1. EMPTY RETURN PREDICTION")
    print("-" * 40)

    print(
        "Prediction:",
        result["empty_return"]["prediction"]
    )

    print(
        "Empty-return probability:",
        result["empty_return"]["empty_return_probability"]
    )

    print(
        "Risk:",
        result["empty_return"]["risk"]
    )

    print(
        "Recommendation:",
        result["empty_return"]["recommendation"]
    )


    # --------------------------------------------------------
    # 2. Ranked loads
    # --------------------------------------------------------

    print()
    print("2. RANKED LOADS")
    print("-" * 40)

    for load in result["ranked_loads"]:
        print(load)


    # --------------------------------------------------------
    # 3. Fair price
    # --------------------------------------------------------

    print()
    print("3. FAIR PRICE")
    print("-" * 40)

    print(result["fair_price"])


    # --------------------------------------------------------
    # 4. Route risk
    # --------------------------------------------------------

    print()
    print("4. ROUTE RISK")
    print("-" * 40)

    print(result["route_risk"])


    # --------------------------------------------------------
    # 5. Load pooling
    # --------------------------------------------------------

    print()
    print("5. LOAD POOLING")
    print("-" * 40)

    for combination in result["load_pooling"]:
        print(combination)


    # --------------------------------------------------------
    # 6. Multi-hop
    # --------------------------------------------------------

    print()
    print("6. BEST MULTI-HOP ROUTE")
    print("-" * 40)

    print(result["multi_hop"])


    # ========================================================
    # COMPLETE
    # ========================================================

    print()
    print("=" * 60)
    print("              ANALYSIS COMPLETE")
    print("=" * 60)