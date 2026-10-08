def normalize_city(value:str)->str: return " ".join(value.strip().lower().split()).title()
def same_corridor(a:str,b:str)->bool: return normalize_city(a)==normalize_city(b)
