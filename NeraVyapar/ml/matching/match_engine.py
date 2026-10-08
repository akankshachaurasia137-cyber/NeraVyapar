import math


# -----------------------------------------
# DISTANCE FUNCTION
# -----------------------------------------

def calculate_distance(driver_location, load_location):
    """
    Prototype distance calculation.

    For now we use predefined distances.
    Later this will be replaced by
    Google Maps / Mapbox / OSRM.
    """

    distances = {
        ("Hubballi", "Bengaluru"): 410,
        ("Hubballi", "Mysuru"): 520,
        ("Hubballi", "Belagavi"): 110,
        ("Hubballi", "Pune"): 430,
        ("Hubballi", "Mumbai"): 580,
        ("Hubballi", "Hyderabad"): 430,
        ("Hubballi", "Chennai"): 700,
        ("Hubballi", "Tumakuru"): 360,
    }

    return distances.get(
        (driver_location, load_location),
        500
    )


# -----------------------------------------
# MATCH SCORE
# -----------------------------------------

def calculate_match_score(
    truck_capacity,
    truck_destination,
    truck_location,
    load
):

    score = 0


    # -------------------------------------
    # 1. DESTINATION MATCH
    # -------------------------------------

    if load["destination"] == truck_destination:

        score += 40

    else:

        # Nearby destination gets partial score
        score += 10


    # -------------------------------------
    # 2. CAPACITY MATCH
    # -------------------------------------

    capacity_difference = abs(
        truck_capacity - load["required_capacity"]
    )

    if capacity_difference == 0:

        score += 30

    elif capacity_difference <= 2:

        score += 20

    elif capacity_difference <= 5:

        score += 10


    # -------------------------------------
    # 3. DISTANCE
    # -------------------------------------

    distance = calculate_distance(
        truck_location,
        load["destination"]
    )

    if distance <= 300:

        score += 20

    elif distance <= 500:

        score += 15

    else:

        score += 5


    # -------------------------------------
    # 4. LOAD AVAILABILITY
    # -------------------------------------

    if load["available"]:

        score += 10


    return score


# -----------------------------------------
# RANK LOADS
# -----------------------------------------

def match_loads(
    truck_capacity,
    truck_destination,
    truck_location,
    loads
):

    results = []


    for load in loads:

        score = calculate_match_score(
            truck_capacity,
            truck_destination,
            truck_location,
            load
        )

        result = load.copy()

        result["match_score"] = score

        results.append(result)


    # Highest score first

    results.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return results


# -----------------------------------------
# TEST
# -----------------------------------------

if __name__ == "__main__":

    loads = [

        {
            "id": 1,
            "destination": "Bengaluru",
            "required_capacity": 12,
            "available": True,
            "price": 18000
        },

        {
            "id": 2,
            "destination": "Mysuru",
            "required_capacity": 10,
            "available": True,
            "price": 16500
        },

        {
            "id": 3,
            "destination": "Belagavi",
            "required_capacity": 12,
            "available": True,
            "price": 9000
        },

        {
            "id": 4,
            "destination": "Pune",
            "required_capacity": 16,
            "available": True,
            "price": 20000
        }
    ]


    ranked_loads = match_loads(

        truck_capacity=12,

        truck_destination="Bengaluru",

        truck_location="Hubballi",

        loads=loads
    )


    print("\n==============================")
    print("NERA VYAPAR LOAD MATCHING")
    print("==============================")

    for load in ranked_loads:

        print(
            f"\nLoad ID: {load['id']}"
        )

        print(
            f"Destination: {load['destination']}"
        )

        print(
            f"Capacity: {load['required_capacity']} tons"
        )

        print(
            f"Price: ₹{load['price']}"
        )

        print(
            f"Match Score: {load['match_score']}"
        )