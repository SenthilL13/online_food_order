from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from .models import *
from .serializers import *



@api_view(["GET"])
def getProduct(response):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many = True)
    return Response(serializer.data)

@api_view(["POST"])
def placeOrder(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Order Placed Successfully"})
    return Response(serializer.error)