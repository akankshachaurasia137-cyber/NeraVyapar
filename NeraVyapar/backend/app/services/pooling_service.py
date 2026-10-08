def find_pool_options(loads,max_capacity):
    options=[]
    for i,a in enumerate(loads):
        total=a.weight_tons
        ids=[a.id]
        if total<=max_capacity:
            for b in loads[i+1:]:
                if total+b.weight_tons<=max_capacity and a.pickup_city.lower()==b.pickup_city.lower() and a.drop_city.lower()==b.drop_city.lower():
                    total+=b.weight_tons; ids.append(b.id)
            if len(ids)>1: options.append({"load_ids":ids,"total_weight_tons":total,"capacity_utilization":round(total/max_capacity*100,1)})
    return options
