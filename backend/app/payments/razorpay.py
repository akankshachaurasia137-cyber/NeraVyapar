from ..config import settings

def create_order(amount):
   
    if not settings.razorpay_key_id: return {"id":f"demo_order_{int(amount)}","amount":int(amount*100),"currency":"INR"}
    import razorpay
    client=razorpay.Client(auth=(settings.razorpay_key_id,settings.razorpay_key_secret))
    return client.order.create({"amount":int(amount*100),"currency":"INR","payment_capture":1})
