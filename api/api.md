 
# list of category
http://localhost:5550/categories



# bike lists with category when user click on any 4 category it will show bikes accordingly 
http://localhost:5550/catbike?categoryId=4

# bikes wrt to brand id
localhost:5550/bikes?brand=4

# bikes wrt brand id  lprice hprice
http://localhost:5550/filter/2?lprice=20000&hprice=80000

# category wrt brandId
http://localhost:5550/filter/2?category=Scooter

<!-- example - brandid 8 means kewey and category=Sport Bikes -->
http://localhost:5550/filter/8?category=Sport%20Bikes



# bikes with brandId wrt category price
//brandid 8 ka sportsbike 200000 to 400000 
http://localhost:5550/filter/8?category=Sport%20Bikes&lprice=200000&hprice=400000




<!-- bikes wrt category
bikes wrt to category and brandid -->

http://localhost:5550/filtercat/1?brandId=7


# bikes also (wrt category) and lprice and hprice
localhost:5550/filtercat/1?lprice=100000&hprice=200000


# bikes also (wrt category) and brandid and lprice and hprice
http://localhost:5550/filtercat/1?brandId=7&lprice=100000&hprice=200000




# Details of bike
http://localhost:5550/details/4.8


