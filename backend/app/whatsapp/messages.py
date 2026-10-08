def format_match_message(matches): return "\n".join([f"{i+1}. Driver {m["driver_id"]} — score {m["score"]}" for i,m in enumerate(matches[:5])])
