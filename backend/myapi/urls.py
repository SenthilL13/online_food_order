from django.urls import path
from .views import *

urlpatterns = [
    path("products/", getProduct),
    path("place_order/", placeOrder),
]