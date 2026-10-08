def update_trust(current_score,trip_completed=True,rating=5):
    delta=(rating-3)*2 + (2 if trip_completed else -3)
    return max(0,min(100,current_score+delta))
