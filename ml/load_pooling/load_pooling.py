# Nera Vyapar
# Load Pooling Engine


def find_load_combinations(
    truck_capacity,
    loads
):

    combinations = []


    # Try every pair of loads

    for i in range(len(loads)):

        for j in range(i + 1, len(loads)):

            load1 = loads[i]
            load2 = loads[j]

            total_weight = (
                load1["weight"]
                + load2["weight"]
            )


            # Check capacity

            if total_weight <= truck_capacity:

                combinations.append({

                    "loads": [
                        load1["id"],
                        load2["id"]
                    ],

                    "total_weight": total_weight,

                    "remaining_capacity":
                        truck_capacity - total_weight
                })


    # Highest utilization first

    combinations.sort(

        key=lambda x:
        x["total_weight"],

        reverse=True
    )


    return combinations


# -----------------------------------------
# TEST
# -----------------------------------------

if __name__ == "__main__":

    truck_capacity = 12


    loads = [

        {
            "id": "L001",
            "weight": 5
        },

        {
            "id": "L002",
            "weight": 4
        },

        {
            "id": "L003",
            "weight": 3
        },

        {
            "id": "L004",
            "weight": 8
        }
    ]


    results = find_load_combinations(

        truck_capacity,

        loads
    )


    print("\n==============================")

    print("NERA VYAPAR LOAD POOLING")

    print("==============================")


    for result in results:

        print(

            f"\nLoads: {result['loads']}"

        )

        print(

            f"Total weight: "
            f"{result['total_weight']} tons"

        )

        print(

            f"Remaining capacity: "
            f"{result['remaining_capacity']} tons"

        )