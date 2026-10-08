def valid_phone(phone:str)->bool: return phone.isdigit() and 10<=len(phone)<=15
def valid_language(language:str)->bool: return language in {"en","hi","kn"}
