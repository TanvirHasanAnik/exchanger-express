Front end code repository: https://github.com/TanvirHasanAnik/exchanger-jquery.git

List of api urls:
User Login: post | http://localhost:3000/user/login
User Register: post | http://localhost:3000/user/register
Logout : post | http://localhost:3000/user/logout
Profile details: get | http://localhost:3000/user/get-profile
Product list: get | http://localhost:3000/user-products/products-list
Add new product: post | http://localhost:3000/user-products/add-product
category details: get | http://localhost:3000/user-products/get-category
expected product list: get | http://localhost:3000/user-products/expected-products-list
expected category list: get | http://localhost:3000/user-products/expected-category-list

add review: post | http://localhost:3000/review/add-review
get review: get | http://localhost:3000/review/get-review?userid=0
review count: get | http://localhost:3000/review/get-review-count?userid=0


Sentiment check: get | http://localhost:3000/review/sentiment (body = {"text":"testing sentiment"})

---
install python
path: C:\Users\ (username)\AppData\Local\Programs\Python\Python313 to both user and system environment
go to path and use bash to install - pip install vaderSentiment
