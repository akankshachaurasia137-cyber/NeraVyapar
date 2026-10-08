# Nera Vyapar
# Multi-Hop Return Optimization


def find_best_route(routes):

    best_route = None
    best_score = float("-inf")


    for route in routes:

        total_revenue = sum(
            stop["revenue"]
            for stop in route["stops"]
        )

        total_distance = sum(
            stop["distance"]
            for stop in route["stops"]
        )

        number_of_stops = len(route["stops"])


        # Penalize excessive distance
        distance_penalty = total_distance * 10


        # Small penalty for every extra stop
        stop_penalty = number_of_stops * 500


        # Final optimization score
        score = (
            total_revenue
            - distance_penalty
            - stop_penalty
        )


        if score > best_score:

            best_score = score

            best_route = {
                "route": route["name"],
                "revenue": total_revenue,
                "distance": total_distance,
                "stops": number_of_stops,
                "score": score
            }


    return best_route


# -----------------------------------------
# TEST
# -----------------------------------------

if __name__ == "__main__":

    routes = [

        {
            "name": "Hubballi → Bengaluru",

            "stops": [

                {
                    "destination": "Bengaluru",
                    "revenue": 18000,
                    "distance": 410
                }
            ]
        },


        {
            "name": "Hubballi → Belagavi → Pune",

            "stops": [

                {
                    "destination": "Belagavi",
                    "revenue": 7000,
                    "distance": 110
                },

                {
                    "destination": "Pune",
                    "revenue": 14000,
                    "distance": 350
                }
            ]
        },


        {
            "name": "Hubballi → Hyderabad",

            "stops": [

                {
                    "destination": "Hyderabad",
                    "revenue": 19000,
                    "distance": 430
                }
            ]
        }
    ]


    result = find_best_route(routes)


    print("\n==============================")

    print("NERA VYAPAR MULTI-HOP OPTIMIZER")

    print("==============================")


    print("\nBest Route:")

    print(result["route"])


    print("\nExpected Revenue:")

    print(f"₹{result['revenue']:,}")


    print("\nTotal Distance:")

    print(f"{result['distance']} km")


    print("\nNumber of Stops:")

    print(result["stops"])


    print("\nOptimization Score:")

    print(round(result["score"], 2))