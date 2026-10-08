from ..services.prediction_service import empty_return_prediction
from ..services.pricing_service import fair_price
from ..services.route_risk_service import score_route
from ..services.load_service import get_open
from ..services.matching_service import rank_matches
from ..services.pooling_service import find_pool_options
from ..services.multi_hop_service import build_hops


def analyze_truck(
    db,
    current_city,
    destination_city,
    capacity_tons,
    vehicle_type="open",
    cargo_type="General",
    days_until_available=1,
):
    # --------------------------------------------------
    # 1. Empty Return Prediction
    # --------------------------------------------------
    empty_return = empty_return_prediction(
        current_city=current_city,
        destination_city=destination_city,
        days_until_available=days_until_available,
        capacity_tons=capacity_tons,
    )

    # --------------------------------------------------
    # 2. Fair Price
    # --------------------------------------------------
    pricing = fair_price(
        pickup=current_city,
        drop=destination_city,
        vehicle_type=vehicle_type,
        weight_tons=capacity_tons,
        demand_score=0.5,
    )

    # --------------------------------------------------
    # 3. Route Risk
    # --------------------------------------------------
    route_risk = score_route(
        origin=current_city,
        destination=destination_city,
    )

    # --------------------------------------------------
    # 4. Get Open Loads
    # --------------------------------------------------
    loads = get_open(db)

    # --------------------------------------------------
    # 5. Matching
    # --------------------------------------------------
    matching_results = []

    for load in loads:
        matches = rank_matches(db, load)

        for match in matches:
            if match["score"] >= 50:
                matching_results.append(match)

    matching_results = sorted(
        matching_results,
        key=lambda x: x["score"],
        reverse=True
    )[:10]

    # --------------------------------------------------
    # 6. Load Pooling
    # --------------------------------------------------
    pooling_options = find_pool_options(
        loads,
        capacity_tons
    )

    # --------------------------------------------------
    # 7. Multi-Hop Route
    # --------------------------------------------------
    multi_hop = build_hops(
        loads,
        current_city,
        max_hops=3
    )

    # --------------------------------------------------
    # 8. Final Combined Response
    # --------------------------------------------------
    return {
        "truck": {
            "current_city": current_city,
            "destination_city": destination_city,
            "capacity_tons": capacity_tons,
            "vehicle_type": vehicle_type,
            "cargo_type": cargo_type,
        },

        "empty_return": empty_return,

        "fair_price": pricing,

        "route_risk": route_risk,

        "matching": {
            "total_matches": len(matching_results),
            "top_matches": matching_results,
        },

        "load_pooling": pooling_options,

        "multi_hop": multi_hop,
    }