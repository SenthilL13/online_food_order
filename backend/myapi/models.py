from django.db import models

# Create your models here.

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('burger', 'Burger'),
        ('pizza', 'Pizza'),
        ('sandwiches', 'Sandwiches'),
        ('shawarmas', 'Shawarmas'),
        ('chinese', 'Chinese'),
        ('shakes&juices', 'Shakes & Juices'),
        ('icecream', 'Ice Cream'),
        ('chillchaat', 'Chill Chaat'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50 , choices=CATEGORY_CHOICES, default="burger")
    description = models.TextField(blank=True)
    price = models.IntegerField(default=00)
    image = models.ImageField(upload_to='product_images/')
    
    def __str__(self):
        return self.name
    

class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    address = models.TextField()
    items = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"

    