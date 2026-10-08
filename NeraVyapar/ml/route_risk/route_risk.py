# Nera Vyapar
# Route Risk Intelligence


def calculate_route_risk(
    distance_km,
    historical_route_success,
    available_loads,
    demand_level
):

    risk_score = 0

    factors = []


    # -----------------------------------------
    # 1. DISTANCE RISK
    # -----------------------------------------

    if distance_km > 600:
        risk_score += 3
        factors.append("Long-distance route")

    elif distance_km > 400:
        risk_score += 2
        factors.append("Medium-long route")


    # -----------------------------------------
    # 2. HISTORICAL SUCCESS
    # -----------------------------------------

    if historical_route_success < 0.40:
        risk_score += 3
        factors.append("Low historical route success")

    elif historical_route_success < 0.65:
        risk_score += 2
        factors.append("Moderate historical route success")


    # -----------------------------------------
    # 3. AVAILABLE LOADS
    # -----------------------------------------

    if available_loads == 0:
        risk_score += 3
        factors.append("No return loads currently available")

    elif available_loads <= 2:
        risk_score += 2
        factors.append("Very few return loads available")

    elif available_loads <= 5:
        risk_score += 1
        factors.append("Limited return loads available")


    # -----------------------------------------
    # 4. DEMAND
    # -----------------------------------------

    if demand_level == "Low":
        risk_score += 2
        factors.append("Low destination demand")

    elif demand_level == "Medium":
        risk_score += 1
        factors.append("Medium destination demand")


    # -----------------------------------------
    # FINAL RISK
    # -----------------------------------------

    if risk_score >= 7:

        risk = "HIGH"

    elif risk_score >= 4:

        risk = "MEDIUM"

    else:

        risk = "LOW"


    return {
        "risk": risk,
        "risk_score": risk_score,
        "factors": factors
    }


# -----------------------------------------
# TEST
# -----------------------------------------

if __name__ == "__main__":

    result = calculate_route_risk(

        distance_km=550,

        historical_route_success=0.40,

        available_loads=2,

        demand_level="Low"
    )


    print("\n==============================")
    print("NERA VYAPAR ROUTE RISK")
    print("==============================")


    print("\nRisk:")
    print(result["risk"])


    print("\nRisk Score:")
    print(result["risk_score"])


    print("\nRisk Factors:")

    for factor in result["factors"]:
        print("-", factor)