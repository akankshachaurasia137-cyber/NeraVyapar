# Nera Vyapar
# Fair Price Estimation Engine


# -----------------------------------------
# BASE PRICING
# -----------------------------------------

BASE_RATE_PER_KM = 35


# -----------------------------------------
# VEHICLE ADJUSTMENTS
# -----------------------------------------

VEHICLE_MULTIPLIER = {

    "Open": 1.00,

    "Closed": 1.10,

    "Refrigerated": 1.35
}


# -----------------------------------------
# DEMAND ADJUSTMENTS
# -----------------------------------------

DEMAND_MULTIPLIER = {

    "Low": 0.95,

    "Medium": 1.05,

    "High": 1.15
}


# -----------------------------------------
# FAIR PRICE FUNCTION
# -----------------------------------------

def calculate_fair_price(
    distance_km,
    vehicle_type,
    demand_level
):

    # Base price
    base_price = distance_km * BASE_RATE_PER_KM


    # Vehicle adjustment
    vehicle_multiplier = VEHICLE_MULTIPLIER.get(
        vehicle_type,
        1.05
    )


    # Demand adjustment
    demand_multiplier = DEMAND_MULTIPLIER.get(
        demand_level,
        1.00
    )


    # Final price
    fair_price = (
        base_price
        * vehicle_multiplier
        * demand_multiplier
    )


    # Round to nearest ₹500
    fair_price = round(
        fair_price / 500
    ) * 500


    # Acceptable price range
    minimum_price = fair_price * 0.90

    maximum_price = fair_price * 1.10


    return {
        "fair_price": int(fair_price),

        "minimum_price": int(minimum_price),

        "maximum_price": int(maximum_price)
    }


# -----------------------------------------
# TEST
# -----------------------------------------

if __name__ == "__main__":

    result = calculate_fair_price(

        distance_km=410,

        vehicle_type="Open",

        demand_level="High"
    )


    print("\n==============================")

    print("NERA VYAPAR FAIR PRICE")

    print("==============================")


    print(
        "\nEstimated Fair Price:"
    )

    print(
        f"₹{result['fair_price']:,}"
    )


    print(
        "\nAcceptable Price Range:"
    )

    print(
        f"₹{result['minimum_price']:,}"
        f" - "
        f"₹{result['maximum_price']:,}"
    )