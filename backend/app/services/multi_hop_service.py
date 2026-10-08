def build_hops(loads,start_city,max_hops=3):
    chain=[]; current=start_city
    for _ in range(max_hops):
        candidate=next((x for x in loads if x.pickup_city.lower()==current.lower() and x.id not in [c.id for c in chain]),None)
        if not candidate: break
        chain.append(candidate); current=candidate.drop_city
    return [{"load_id":x.id,"from":x.pickup_city,"to":x.drop_city,"price":x.offered_price} for x in chain]
