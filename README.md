Front end code repository: https://github.com/TanvirHasanAnik/exchanger-jquery.git

List of api urls:
User Login: POST | http://localhost:3000/user/login
User Register: POST | http://localhost:3000/user/register
Logout : POST | http://localhost:3000/user/logout
Profile details: GET | http://localhost:3000/user/get-profile
Product list: GET | http://localhost:3000/user-products/products-list
Product details: GET | http://localhost:3000/user-products/get-product?productid=1
All Product list: GET | http://localhost:3000/user-products/all-products-list
Add new product: POST | http://localhost:3000/user-products/add-product
category details: GET | http://localhost:3000/user-products/get-category
expected product list: GET | http://localhost:3000/user-products/expected-products-list
expected category list: GET | http://localhost:3000/user-products/expected-category-list
Delete expected product: POST | http://localhost:3000/user-products/delete-expected-product

add review: POST | http://localhost:3000/review/add-review
get review: GET | http://localhost:3000/review/get-review?userid=0
review count: GET | http://localhost:3000/review/get-review-count?userid=0

Match Users: GET | http://localhost:3000/user-products/match-user
Sentiment check: GET | http://localhost:3000/review/sentiment (body = {"text":"testing sentiment"})

---

install python
path: C:\Users\ (username)\AppData\Local\Programs\Python\Python313 to both user and system environment
go to path and use bash to install - pip install vaderSentiment

---

https://github.com/cjhutto/vaderSentiment/blob/master/README.rst
