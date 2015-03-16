**GET Posts/Latest**
----
  Returns json data with 20 latest posts

* **URL**

	/post/latest

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : [ POSTS_ARRAY ] }`

* **Error Response:**

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/posts/latest",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


 **GET Posts/Popular/Views**
----
  Returns json data with 20 most viewed posts

* **URL**

	/post/popular/views

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : [ POSTS_ARRAY ] }`

* **Error Response:**

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/posts/popular/views",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  

 **GET Posts/Popular/Author**
----
  Returns json data with 20 most viewed posts for author

* **URL**

	/post/popular/author

* **Method:**

  `GET`

*  **URL Params**

  **required**
  `author=?[String]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : [ POSTS_ARRAY ] }`

* **Error Response:**

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/posts/popular/author?author=AUTHOR_NAME",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```